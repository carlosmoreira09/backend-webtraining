import { IsString } from 'class-validator';

export class CreateSheetDTO {
  @IsString()
  sheet_name: string;
  @IsString()
  id_exercise: string;
  @IsString()
  sheet_desc: string;
}
