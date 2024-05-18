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
  sheet_details: string;
  @Column()
  training_a: string;
  @Column()
  training_b: string;
  @Column()
  training_c: string;
  @Column()
  training_d: string;
}
