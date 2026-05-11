import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { InventoryLog } from './inventory-log.entity';
import { Product } from './product.entity';

@Entity('suppliers')
export class Supplier {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  contactPerson?: string;

  @Column({ nullable: true })
  email?: string;

  @Column({ nullable: true })
  phone?: string;

  // simple list of category names (or labels) supplied
  @Column({ type: 'simple-array', nullable: true })
  categoriesSupplied?: string[];

  @OneToMany(() => Product, (product) => product.supplier)
  products: Product[];

  @OneToMany(() => InventoryLog, (log) => log.supplier)
  inventoryLogs: InventoryLog[];
}
