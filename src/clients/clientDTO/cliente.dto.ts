import { UsersEntity } from '../../users/users.entity';
import { ListSheetsDTO } from '../../sheets/sheetsDTO/listSheetsDTO.dto';

export class ClientModelFront {
  id_client: number;
  fullName: string;
  age: number;
  email: string;
  phone: string;
  training_type?: string;
  id_sheets?: ListSheetsDTO;
  old_sheets?: string;
  admin?: UsersEntity;
}

export interface NewClientDTO {
  id_client?: number;
  fullName: string;
  age: number;
  email: string;
  phone: string;
  password?: string;
  training_type?: string;
  id_sheets?: number;
  old_sheets?: string;
  admin?: UsersEntity;
}
