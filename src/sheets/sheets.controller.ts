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
  @Get(':id_client')
  async listSheetByClient(@Param('id_client') id_client: number) {
    try {
      return await this.sheetsService.listSheetByClient(id_client);
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
      return 'Exercicio Inserido';
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
