import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ClientsEntity } from '../clients/clients.entity';

@Entity({ name: 'training_sheets' })
export class SheetsEntity {
  @PrimaryGeneratedColumn()
  id_sheet: number;

  @Column()
  id_exercise: string;

  @OneToOne(() => ClientsEntity)
  @JoinColumn()
  id_client: ClientsEntity;
}
