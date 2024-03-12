import {
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ExercisesEntity } from '../exercises/exercises.entity';
import { ClientsEntity } from '../clients/clients.entity';

@Entity({ name: 'training_sheets' })
export class SheetsEntity {
  @PrimaryGeneratedColumn()
  id_sheet: number;

  @OneToMany(() => ExercisesEntity, (exercises) => exercises.exercise)
  exercises: ExercisesEntity[];

  @OneToOne(() => ClientsEntity)
  id_client: ClientsEntity;
}
