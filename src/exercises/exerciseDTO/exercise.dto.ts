import { IsString } from 'class-validator';

export class ExerciseDTO {
  @IsString()
  exercise: string;
  @IsString()
  exercise_desc: string;
  @IsString()
  exercise_type: string;
  @IsString()
  training_type: string;
}
