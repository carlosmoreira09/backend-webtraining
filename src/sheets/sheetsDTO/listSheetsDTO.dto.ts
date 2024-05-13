import { IsNumber, IsObject, IsString, IsTaxId } from 'class-validator';
import { ExercisesEntity } from '../../exercises/exercises.entity';

export class ListSheetsDTO {
  @IsObject()
  exercise: ExercisesEntity[];
  @IsNumber()
  id_sheet: number;
  @IsString()
  sheet_name: string;
  @IsString()
  sheet_desc: string;
}
