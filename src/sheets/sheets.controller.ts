import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { SheetsService } from './sheets.service';
import { CreateSheetDTO } from './sheetsDTO/createSheetDTO.dto';
import { GeneralReturnDTO } from '../responseDTO/generalReturn.dto';
import { JwtAuthGuard } from '../guards/jwt.guard';
import { ListSheetsDTO } from './sheetsDTO/listSheetsDTO.dto';

@Controller('sheets')
export class SheetsController {
  constructor(private readonly sheetsService: SheetsService) {
  }

  @UseGuards(JwtAuthGuard)
  @Get('client/:id_user')
  async listAll(@Param('id_user') id_user: number) {
    try {
      return await this.sheetsService.listSheets(id_user);
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          error: 'Erro ao Listar Planilhas',
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
  async listSheetByClient(
    @Param('id_sheet') id_sheet: number,
  ): Promise<ListSheetsDTO> {
    try {
      return await this.sheetsService.listSheetById(id_sheet);
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          error: 'Erro ao Listar Planilha',
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
  async createSheet(
    @Body() newSheet: CreateSheetDTO,
    @Headers('id_user') id_user: number,
  ): Promise<GeneralReturnDTO> {
    try {
      return await this.sheetsService.create(newSheet, id_user);
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
  @Put()
  async updateSheet(
    @Body() updateSheet: CreateSheetDTO,
  ): Promise<GeneralReturnDTO> {
    try {
      return await this.sheetsService.updateSheet(updateSheet);
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          error: 'Erro ao Atualizar Planilha',
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
  async deleteSHeet(
    @Param('id_sheet') id_sheet: number,
  ): Promise<GeneralReturnDTO> {
    try {
      return await this.sheetsService.delete(id_sheet);
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
