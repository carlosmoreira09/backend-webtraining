import { UsersEntity } from '../../users/users.entity';

export interface ExerciseDTO {
  id_exercise?: number;
  exercise: string;
  exercise_desc: string;
  exercise_type: string;
  repetition: string;
  admin?: UsersEntity;
  videoName?: string;
}

export interface VideoDTO {
  id_exercise?: string;
  videoName: string;
  file: File;
  fileName: string;
}
