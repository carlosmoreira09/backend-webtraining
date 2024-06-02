import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Timestamp,
} from 'typeorm';
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

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: true })
  isActive: boolean;

  @Column()
  userType: string;

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
}
