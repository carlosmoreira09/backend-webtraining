import { ExercisesEntity } from '../../exercises/exercises.entity';

export class ListSheetsDTO {
  id_sheet: any;
  sheet_name: string;
  sheet_desc: string;
  sheet_details: string;
  id_client: any;
  training_a: ExercisesEntity[];
  training_b: ExercisesEntity[];
  training_c: ExercisesEntity[];
  training_d: ExercisesEntity[];
}
