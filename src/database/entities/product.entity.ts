import {
  Column,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from './category.entity';
import { InventoryLog } from './inventory-log.entity';
import { OrderItem } from './order-item.entity';
import { Supplier } from './supplier.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index({ unique: true })
  @Column({ unique: true })
  sku: string;

  @Column()
  name: string;

  @Column({ type: 'numeric', precision: 12, scale: 2 })
  price: string; // keep numeric as string

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'int', default: 0 })
  stockQty: number;

  @Column({ type: 'int', default: 5 })
  reorderLevel: number;

  @ManyToOne(() => Category, (category) => category.products, {
    nullable: false,
    onDelete: 'RESTRICT',
    eager: true,
  })
  category: Category;

  @ManyToOne(() => Supplier, (supplier) => supplier.products, {
    nullable: true,
    onDelete: 'SET NULL',
    eager: true,
  })
  supplier?: Supplier | null;

  @OneToMany(() => OrderItem, (item) => item.product)
  orderItems: OrderItem[];

  @OneToMany(() => InventoryLog, (log) => log.product)
  inventoryLogs: InventoryLog[];
}
