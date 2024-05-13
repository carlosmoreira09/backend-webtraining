import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'training_sheets' })
export class SheetsEntity {
  @PrimaryGeneratedColumn()
  id_sheet: number;
  @Column()
  sheet_name: string;
  @Column()
  sheet_desc: string;
  @Column()
  id_exercise: string;
}
