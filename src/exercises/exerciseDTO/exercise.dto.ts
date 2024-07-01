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

export interface UploadVideoDTO {
  originalname: any;
  encoding: any;
  mimetype: any;
  buffer: any;
  size: number;
  filename: any;
  path: any;
}
