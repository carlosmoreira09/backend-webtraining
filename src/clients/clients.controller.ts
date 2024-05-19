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
} from '@nestjs/common';
import { ClientsService } from './clients.service';
import { ClientDTO } from './clientDTO/cliente.dto';

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientService: ClientsService) {}

  @Post()
  async create(
    @Body() clientRequest: ClientDTO,
    @Headers('id_user') id_user: number,
  ) {
    try {
      await this.clientService.create(clientRequest, id_user);
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

  @Get('/athletas/:id_user')
  async listAll(@Param('id_user') id_user: number) {
    try {
      return await this.clientService.listClientByUser(id_user);
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
