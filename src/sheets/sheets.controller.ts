import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Headers,
  UseGuards,
} from '@nestjs/common';
import { SheetsService } from './sheets.service';
import { CreateSheetDTO } from './sheetsDTO/createSheetDTO.dto';
import { GeneralReturnDTO } from '../responseDTO/generalReturn.dto';
import { JwtAuthGuard } from '../guards/jwt.guard';

@Controller('sheets')
export class SheetsController {
  constructor(private readonly sheetsService: SheetsService) {}

  @UseGuards(JwtAuthGuard)
  @Get('client/:id_user')
  async listAll(@Param('id_user') id_user: number) {
    try {
      return await this.sheetsService.listSheets(id_user);
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
  @UseGuards(JwtAuthGuard)
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

  @UseGuards(JwtAuthGuard)
  @Post()
  async createSheet(@Body() newSheet: CreateSheetDTO,
    @Headers('id_user') id_user: number,
  ) {
    try {
      await this.sheetsService.create(newSheet, id_user);
      const returnMessage: GeneralReturnDTO = new GeneralReturnDTO();
      returnMessage.message = 'Planilha Adicionada';
      returnMessage.status = 200;
      return returnMessage;
    } catch (error) {
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
  @UseGuards(JwtAuthGuard)
  @Delete(':id_sheet')
  async deleteSHeet(@Param('id_sheet') id_sheet: number) {
    try {
      await this.sheetsService.delete(id_sheet);
      const returnMessage: GeneralReturnDTO = new GeneralReturnDTO();
      returnMessage.message = 'Planilha Deletada';
      returnMessage.status = 200;
      return returnMessage;
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          error: 'Erro ao Deletar Planilha',
        },
        HttpStatus.BAD_REQUEST,
        {
          cause: error,
        },
      );
    }
  }
}
