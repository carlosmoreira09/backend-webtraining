import { ClientsEntity } from '../../clients/clients.entity';
import { ExercisesEntity } from '../../exercises/exercises.entity';

export class ReturnSheetToFront {
  id_sheet: number;
  exercises: ExercisesEntity[];
  id_client: ClientsEntity;
}