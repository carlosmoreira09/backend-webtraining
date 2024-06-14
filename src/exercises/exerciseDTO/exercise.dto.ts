import { IsString } from 'class-validator';
import { UsersEntity } from '../../users/users.entity';

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
  admin?: UsersEntity;
}
