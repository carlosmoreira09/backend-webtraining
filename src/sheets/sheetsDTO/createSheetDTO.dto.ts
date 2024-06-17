import { UsersEntity } from '../../users/users.entity';

export interface CreateSheetDTO {
  sheet_name: string;
  sheet_desc: string;
  sheet_details: string;
  training_a: string;
  training_b?: string;
  training_c?: string;
  training_d?: string;
  admin?: UsersEntity;
  id_client?: any;
}
