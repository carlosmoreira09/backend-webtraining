import { UsersEntity } from '../../users/users.entity';

export interface NewClientDTO {
  fullName: string;
  age: number;
  email: string;
  phone: string;
  password: string;
  id_training?: number;
  ids_sheets: number;
  old_sheets?: string;
  admin?: UsersEntity;
}
