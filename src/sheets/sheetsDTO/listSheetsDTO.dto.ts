import { IsNumber, IsObject, IsString } from 'class-validator';
import { ExercisesEntity } from '../../exercises/exercises.entity';

export class ListSheetsDTO {
  @IsNumber()
  id_sheet: number;
  @IsString()
  sheet_name: string;
  @IsString()
  sheet_desc: string;
  @IsString()
  sheet_details: string;
  @IsObject()
  training_a: ExercisesEntity[];
  @IsObject()
  training_b: ExercisesEntity[];
  @IsObject()
  training_c: ExercisesEntity[];
  @IsObject()
  training_d: ExercisesEntity[];
}
