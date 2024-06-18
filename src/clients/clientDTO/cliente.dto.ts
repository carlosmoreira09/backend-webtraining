import { UsersEntity } from '../../users/users.entity';

export interface NewClientDTO {
  fullName: string;
  age: number;
  email: string;
  phone: string;
  password: string;
  training_type?: string;
  id_sheets?: number;
  old_sheets?: string;
  admin?: UsersEntity;
}
