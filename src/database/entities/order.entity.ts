import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderStatus } from '../../common/enums/order-status.enum';
import { OrderItem } from './order-item.entity';
import { User } from './user.entity';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.ordersPlaced, {
    nullable: false,
    onDelete: 'RESTRICT',
    eager: true,
  })
  customer: User;

  @ManyToOne(() => User, (user) => user.ordersProcessed, {
    nullable: true,
    onDelete: 'SET NULL',
    eager: true,
  })
  processedBy?: User | null;

  @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.PENDING })
  status: OrderStatus;

  @CreateDateColumn()
  placedAt: Date;

  @Column({ type: 'numeric', precision: 12, scale: 2, default: 0 })
  totalAmount: string;

  @OneToMany(() => OrderItem, (item) => item.order, {
    cascade: true,
  })
  items: OrderItem[];
}
