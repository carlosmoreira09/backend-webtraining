import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Timestamp,
} from 'typeorm';
import { SheetsEntity } from '../sheets/sheets.entity';
import { ExercisesEntity } from '../exercises/exercises.entity';

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

  @Column({ default: 0 })
  id_training: string;

  @Column({ default: true })
  isActive: boolean;

  @Column()
  ids_sheets: number;

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
