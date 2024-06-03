import {
  Column, CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn, Timestamp,
} from 'typeorm';
import { ClientsEntity } from '../clients/clients.entity';

@Entity({ name: 'training_sheets' })
export class SheetsEntity {
  @PrimaryGeneratedColumn()
  id_sheet: number;
  @Column()
  sheet_name: string;
  @Column()
  sheet_desc: string;
  @Column()
  sheet_details: string;
  @Column()
  training_a: string;
  @Column()
  training_b: string;
  @Column()
  training_c: string;
  @Column()
  training_d: string;
  @CreateDateColumn({
    name: 'deleted_at',
    type: 'timestamp',
    default: null,
  })
  deletedAt?: Timestamp;
  @ManyToOne(() => ClientsEntity, (client) => client.id_client)
  @JoinColumn({ name: 'id_client' })
  id_client: ClientsEntity;
}
