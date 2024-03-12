import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { ClientsService } from './clients.service';
import { ClientDTO } from './clientDTO/cliente.dto';

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientService: ClientsService) {}

  @Post()
  async create(@Body() clientRequest: ClientDTO) {
    try {
      await this.clientService.create(clientRequest);
      return 'Client Created';
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.CONFLICT,
          error: 'Email já existe',
        },
        HttpStatus.CONFLICT,
        {
          cause: error,
        },
      );
    }
  }

  @Get()
  async listAll() {
    try {
      return await this.clientService.list();
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.CONFLICT,
          error: 'Erro ao listar cliente',
        },
        HttpStatus.CONFLICT,
        {
          cause: error,
        },
      );
    }
  }

  @Get(':id')
  async clientInformation(@Param('id') id: number) {
    try {
      return await this.clientService.clientInformation(id);
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.CONFLICT,
          error: 'Erro recuperar informações do cliente',
        },
        HttpStatus.CONFLICT,
        {
          cause: error,
        },
      );
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    try {
      return await this.clientService.remove(id);
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.CONFLICT,
          error: 'Erro recuperar informações do cliente',
        },
        HttpStatus.CONFLICT,
        {
          cause: error,
        },
      );
    }
  }
}
