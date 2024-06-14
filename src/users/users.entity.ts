import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, Timestamp } from 'typeorm';
import { PaymentStatus } from './userDTO/user.dto';

@Entity({ name: 'users' })
export class UsersEntity {
  @PrimaryGeneratedColumn()
  id_user: number;

  @Column({
    unique: true,
    nullable: false,
  })
  username: string;

  @Column()
  fullName: string;

  @Column({
    unique: true,
    nullable: false,
  })
  email: string;

  @Column()
  password: string;

  @Column({ default: true })
  isActive: boolean;

  @Column()
  userType: string;

  @Column({
    default: null,
  })
  paymentDate?: Date;

  @Column({
    type: 'enum',
    enum: PaymentStatus,
    default: PaymentStatus.pago,
  })
  paymentStatus: PaymentStatus;

  @Column({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'current_timestamp',
  })
  updatedAt?: Timestamp;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
  })
  createdAt?: Timestamp;
  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamp',
  })
  deletedAt?: Timestamp;
}
