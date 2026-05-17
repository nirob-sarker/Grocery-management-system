import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserRole } from '../../common/enums/user-role.enum';
import { Order } from './order.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index({ unique: true })
  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string; // hashed

  @Column({ type: 'enum', enum: UserRole, default: UserRole.CUSTOMER })
  role: UserRole;

  @Column()
  fullName: string;

  @Column({ nullable: true })
  phone?: string;

  @Column({ type: 'text', nullable: true })
  address?: string;

  // OTP reset support (we reuse these columns)
  @Column({ type: 'text', nullable: true })
  passwordResetTokenHash?: string | null;

  @Column({ type: 'timestamptz', nullable: true })
  passwordResetTokenExpiresAt?: Date | null;

  @Column({ type: 'int', default: 0 })
  passwordResetAttempts: number;

  @Column({ type: 'timestamptz', nullable: true })
  passwordResetLastSentAt?: Date | null;

  @OneToMany(() => Order, (order) => order.customer)
  ordersPlaced: Order[];

  @OneToMany(() => Order, (order) => order.processedBy)
  ordersProcessed: Order[];
}
