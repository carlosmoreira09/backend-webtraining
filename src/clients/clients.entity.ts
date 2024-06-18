import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Timestamp,
} from 'typeorm';
import { UsersEntity } from '../users/users.entity';

@Entity({ name: 'clients' })
export class ClientsEntity {
  @PrimaryGeneratedColumn()
  id_client: number;

  @Column({
    name: 'full_name',
    nullable: false,
  })
  fullName: string;

  @Column()
  age: number;

  @Column({
    unique: true,
    nullable: false,
  })
  email: string;

  @Column()
  phone: string;

  @Column()
  password: string;

  @Column()
  id_training?: string;

  @Column({
    default: true,
    nullable: true,
  })
  isActive?: boolean;

  @Column({
    nullable: true,
  })
  ids_sheets?: number;

  @Column({
    nullable: true,
  })
  old_sheets?: string;

  @ManyToOne(() => UsersEntity, (users) => users.id_user)
  @JoinColumn()
  admin: UsersEntity;

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
