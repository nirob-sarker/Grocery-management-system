import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { OrderStatus } from '../common/enums/order-status.enum';
import { UserRole } from '../common/enums/user-role.enum';
import { OrderItem } from '../database/entities/order-item.entity';
import { Order } from '../database/entities/order.entity';
import { Product } from '../database/entities/product.entity';
import { MailService } from '../mail/mail.service';
import { UsersService } from '../users/users.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';

@Injectable()
export class OrdersService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly config: ConfigService,
    private readonly mailService: MailService,
    private readonly usersService: UsersService,
    @InjectRepository(Order) private readonly orderRepo: Repository<Order>,
    @InjectRepository(Product) private readonly productRepo: Repository<Product>,
    @InjectRepository(OrderItem) private readonly itemRepo: Repository<OrderItem>,
  ) {}

  async placeOrder(customer: any, dto: CreateOrderDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    const itemsSummary: { name: string; qty: number; unitPrice: string }[] = [];

    try {
      const order = queryRunner.manager.create(Order, {
        customer,
        status: OrderStatus.PENDING,
        totalAmount: '0',
        items: [],
      });
      const savedOrder = await queryRunner.manager.save(Order, order);

      let total = 0;

      for (const it of dto.items) {
        // IMPORTANT: lock product row WITHOUT JOINs (avoid eager relations)
        const product = await queryRunner.manager
          .getRepository(Product)
          .createQueryBuilder('p')
          .setLock('pessimistic_write')
          .where('p.id = :id', { id: it.productId })
          .getOne();

        if (!product) throw new BadRequestException(`Invalid productId: ${it.productId}`);

        if (product.stockQty < it.qty) {
          throw new BadRequestException(`Insufficient stock for ${product.name}. Available: ${product.stockQty}`);
        }

        product.stockQty -= it.qty;
        await queryRunner.manager.save(Product, product);

        const unitPrice = product.price; // numeric string
        total += Number(unitPrice) * it.qty;

        const item = queryRunner.manager.create(OrderItem, {
          order: savedOrder,
          product,
          quantity: it.qty,
          unitPrice,
        });
        await queryRunner.manager.save(OrderItem, item);

        itemsSummary.push({ name: product.name, qty: it.qty, unitPrice });
      }

      savedOrder.totalAmount = total.toFixed(2);
      const finalOrder = await queryRunner.manager.save(Order, savedOrder);

      await queryRunner.commitTransaction();

      // Email: order confirmed
      await this.mailService.sendOrderConfirmed(customer.email, {
        orderId: finalOrder.id,
        name: customer.fullName,
        status: finalOrder.status,
        total: finalOrder.totalAmount,
        items: itemsSummary,
      });

      // Low stock alert (optional)
      const threshold = Number(this.config.get<string>('LOW_STOCK_THRESHOLD') ?? 5);
      const adminStaffEmails = await this.usersService.findEmailsByRoles([UserRole.ADMIN, UserRole.STAFF]);

      for (const it of dto.items) {
        const p = await this.productRepo.findOne({ where: { id: it.productId } });
        if (!p) continue;
        if (p.stockQty < Math.max(p.reorderLevel ?? threshold, threshold)) {
          await this.mailService.sendLowStockAlert(adminStaffEmails, {
            productName: p.name,
            sku: p.sku,
            stockQty: p.stockQty,
            reorderLevel: p.reorderLevel ?? threshold,
          });
        }
      }

      return { message: 'Order placed', orderId: finalOrder.id };
    } catch (e) {
      await queryRunner.rollbackTransaction();
      throw e;
    } finally {
      await queryRunner.release();
    }
  }

  async myOrders(customerId: string) {
    return this.orderRepo.find({
      where: { customer: { id: customerId } },
      order: { placedAt: 'DESC' },
      relations: { items: true },
    });
  }

  async orderDetails(orderId: string, user: any) {
    const order = await this.orderRepo.findOne({
      where: { id: orderId },
      relations: { items: true },
      order: { items: { id: 'ASC' } } as any,
    });
    if (!order) throw new NotFoundException('Order not found');

    const isCustomer = user.role === UserRole.CUSTOMER;
    if (isCustomer && order.customer?.id !== user.id) {
      throw new ForbiddenException('You cannot view this order');
    }
    return order;
  }

  async updateStatus(orderId: string, staffUser: any, dto: UpdateOrderStatusDto) {
    const order = await this.orderRepo.findOne({
      where: { id: orderId },
      relations: { items: true },
    });
    if (!order) throw new NotFoundException('Order not found');

    order.status = dto.status;
    order.processedBy = staffUser;

    const saved = await this.orderRepo.save(order);

    await this.mailService.sendOrderStatusUpdated(order.customer.email, {
      orderId: saved.id,
      name: saved.customer.fullName,
      status: saved.status,
      total: saved.totalAmount,
    });

    return { message: 'Status updated', order: saved };
  }

  async cancelOrder(orderId: string, user: any) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const order = await queryRunner.manager.findOne(Order, {
        where: { id: orderId },
        relations: { items: true },
      });
      if (!order) throw new NotFoundException('Order not found');

      const isAdmin = user.role === UserRole.ADMIN;
      const isCustomerOwner = user.role === UserRole.CUSTOMER && order.customer?.id === user.id;

      if (!isAdmin && !isCustomerOwner) {
        throw new ForbiddenException('Not allowed to cancel this order');
      }

      if (order.status !== OrderStatus.PENDING && !isAdmin) {
        throw new BadRequestException('Only pending orders can be cancelled by customer');
      }

      // restore stock
      if (order.items?.length) {
        for (const item of order.items) {
          const product = await queryRunner.manager
            .getRepository(Product)
            .createQueryBuilder('p')
            .setLock('pessimistic_write')
            .where('p.id = :id', { id: item.product.id })
            .getOne();

          if (product) {
            product.stockQty += item.quantity;
            await queryRunner.manager.save(Product, product);
          }
        }
      }

      order.status = OrderStatus.CANCELLED;
      const saved = await queryRunner.manager.save(Order, order);

      await queryRunner.commitTransaction();
      return { message: 'Order cancelled', order: saved };
    } catch (e) {
      await queryRunner.rollbackTransaction();
      throw e;
    } finally {
      await queryRunner.release();
    }
  }
}
