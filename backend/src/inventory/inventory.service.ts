import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRole } from '../common/enums/user-role.enum';
import { InventoryLog } from '../database/entities/inventory-log.entity';
import { Product } from '../database/entities/product.entity';
import { Supplier } from '../database/entities/supplier.entity';
import { MailService } from '../mail/mail.service';
import { UsersService } from '../users/users.service';
import { RestockDto } from './dto/restock.dto';

@Injectable()
export class InventoryService {
  constructor(
    private readonly config: ConfigService,
    private readonly mailService: MailService,
    private readonly usersService: UsersService,
    @InjectRepository(Product) private readonly productRepo: Repository<Product>,
    @InjectRepository(Supplier) private readonly supplierRepo: Repository<Supplier>,
    @InjectRepository(InventoryLog) private readonly logRepo: Repository<InventoryLog>,
  ) {}

  async restock(dto: RestockDto) {
    const product = await this.productRepo.findOne({ where: { id: dto.productId } });
    if (!product) throw new NotFoundException('Product not found');

    let supplier: Supplier | null = null;
    if (dto.supplierId) {
      supplier = await this.supplierRepo.findOne({ where: { id: dto.supplierId } });
      if (!supplier) throw new BadRequestException('Invalid supplierId');
    }

    product.stockQty += dto.quantity;
    if (supplier) product.supplier = supplier;

    await this.productRepo.save(product);

    const log = this.logRepo.create({
      product,
      quantityAdded: dto.quantity,
      supplier: supplier ?? null,
      note: dto.note?.trim(),
    });
    const savedLog = await this.logRepo.save(log);

    const adminEmails = await this.usersService.findEmailsByRoles([UserRole.ADMIN]);
    await this.mailService.sendRestockLogged(adminEmails, {
      productName: product.name,
      sku: product.sku,
      qty: dto.quantity,
      supplierName: supplier?.name ?? 'N/A',
      time: new Date().toISOString(),
    });

    return { message: 'Restock logged', product, log: savedLog };
  }

  async report(threshold?: number) {
    const products = await this.productRepo.find({ order: { name: 'ASC' } });

    const defaultThreshold = Number(this.config.get<string>('LOW_STOCK_THRESHOLD') ?? 5);
    const usedThreshold = threshold ?? defaultThreshold;

    const lowStock = products.filter((p) => p.stockQty < Math.max(p.reorderLevel ?? usedThreshold, usedThreshold));

    return {
      threshold: usedThreshold,
      totalProducts: products.length,
      lowStockCount: lowStock.length,
      lowStock,
      products,
    };
  }

  async logs(limit = 20, offset = 0) {
    const [data, total] = await this.logRepo.findAndCount({
      take: Math.min(limit, 100),
      skip: Math.max(offset, 0),
      order: { loggedAt: 'DESC' },
    });
    return { total, limit, offset, data };
  }
}
