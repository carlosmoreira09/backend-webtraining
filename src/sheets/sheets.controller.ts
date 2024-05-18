import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { SheetsService } from './sheets.service';
import { CreateSheetDTO } from './sheetsDTO/createSheetDTO.dto';

@Controller('sheets')
export class SheetsController {
  constructor(private readonly sheetsService: SheetsService) {}

  @Get()
  async listAll() {
    try {
      return await this.sheetsService.listSheets();
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          error: 'Erro ao Listar',
        },
        HttpStatus.BAD_REQUEST,
        {
          cause: error,
        },
      );
    }
  }
  @Get(':id_sheet')
  async listSheetByClient(@Param('id_sheet') id_sheet: number) {
    try {
      return await this.sheetsService.listSheetById(id_sheet);
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          error: 'Erro ao Listar',
        },
        HttpStatus.BAD_REQUEST,
        {
          cause: error,
        },
      );
    }
  }

  @Post()
  async createSheet(@Body() newSheet: CreateSheetDTO) {
    try {
      await this.sheetsService.create(newSheet);
      return 'Planilha Inserido';
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          error: 'Erro ao Criar Planilha',
        },
        HttpStatus.BAD_REQUEST,
        {
          cause: error,
        },
      );
    }
  }
}
