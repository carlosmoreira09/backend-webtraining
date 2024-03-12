import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { SheetsEntity } from '../sheets/sheets.entity';

@Entity({ name: 'exercises' })
export class ExercisesEntity {
  @PrimaryGeneratedColumn()
  id_exercise: number;

  @Column()
  exercise: string;

  @Column()
  exercise_desc: string;

  @Column()
  exercise_type: string;

  @Column()
  training_type: string;

  @OneToMany(() => SheetsEntity, (sheets) => sheets.id_sheet)
  sheets: SheetsEntity[];
}
