import { UsersEntity } from '../../users/users.entity';

export interface CreateSheetDTO {
  id_sheet?: number;
  sheet_name: string;
  sheet_desc: string;
  sheet_details: string;
  training_a: string;
  training_b?: string;
  training_c?: string;
  training_d?: string;
  training_e?: string;
  training_f?: string;
  admin?: UsersEntity;
  id_client?: any;
  id_user?: number;
}
