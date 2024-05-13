import { IsInt, IsString } from 'class-validator';

export class GeneralReturnDTO {
  @IsString()
  message?: string;
  @IsInt()
  status?: number;
}
