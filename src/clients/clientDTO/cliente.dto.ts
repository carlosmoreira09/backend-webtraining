import { UsersEntity } from '../../users/users.entity';

export class ClientDTO {
  fullName: string;
  age: number;
  email: string;
  phone: string;
  id_training?: string;
  ids_sheets: number;
  old_sheets?: string;
  admin: UsersEntity;
}
