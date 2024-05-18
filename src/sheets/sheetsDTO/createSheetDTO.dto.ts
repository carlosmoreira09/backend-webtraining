import { IsString } from 'class-validator';

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
}
