import { IsEmail, IsInt, IsString } from 'class-validator';
import { SheetsEntity } from '../../sheets/sheets.entity';
import { UsersEntity } from '../../users/users.entity';


export class ClientDTO {
  @IsString()
  fullName?: string;
  @IsInt()
  age?: number;
  @IsEmail()
  email?: string;
  @IsString()
  phone?: string;
  @IsInt()
  id_sheet?: SheetsEntity[];
  id_user?: UsersEntity;
}
