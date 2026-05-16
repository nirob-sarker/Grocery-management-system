import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from './product.entity';
import { Supplier } from './supplier.entity';

@Entity('inventory_logs')
export class InventoryLog {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Product, (product) => product.inventoryLogs, {
    nullable: false,
    onDelete: 'CASCADE',
    eager: true,
  })
  product: Product;

  @Column({ type: 'int' })
  quantityAdded: number;

  @ManyToOne(() => Supplier, (supplier) => supplier.inventoryLogs, {
    nullable: true,
    onDelete: 'SET NULL',
    eager: true,
  })
  supplier?: Supplier | null;

  @CreateDateColumn()
  loggedAt: Date;

  @Column({ type: 'text', nullable: true })
  note?: string;
}
