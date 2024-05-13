import { IsInt, IsString } from 'class-validator';

export class UpdateSheetDTO {
  @IsString()
  id_exercise: string;
  @IsInt()
  sheet_name: string;
  @IsInt()
  id_sheet: number;
  @IsInt()
  sheet_desc: string;
}
