import { IsString } from 'class-validator';
import { UsersEntity } from '../../users/users.entity';
import { ClientsEntity } from '../../clients/clients.entity';

export class CreateSheetDTO {
  @IsString()
  sheet_name: string;
  @IsString()
  sheet_desc: string;
  @IsString()
  sheet_details: string;
  @IsString()
  training_a: string;
  @IsString()
  training_b?: string;
  @IsString()
  training_c?: string;
  @IsString()
  training_d?: string;
  admin?: UsersEntity;
  id_client?: ClientsEntity;
}
