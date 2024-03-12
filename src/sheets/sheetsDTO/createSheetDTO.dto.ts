import { ClientsEntity } from '../../clients/clients.entity';
import { ExercisesEntity } from '../../exercises/exercises.entity';

export class CreateSheetDTO {
  exercises: ExercisesEntity[];
  id_client: ClientsEntity;
}