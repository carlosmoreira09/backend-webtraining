import { IsString } from 'class-validator';
import { ClientsEntity } from '../../clients/clients.entity';

export class ExerciseDTO {
  @IsString()
  exercise: string;
  @IsString()
  exercise_desc: string;
  @IsString()
  exercise_type: string;
  @IsString()
  training_type: string;
  @IsString()
  repetition: string;
  id_client?: ClientsEntity;
}
