import { IsInt, IsString } from 'class-validator';

export class UpdateSheetDTO {
  @IsString()
  id_exercise: string;
  @IsInt()
  id_client: number;
  @IsInt()
  id_sheet: number;
}
