import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post, UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDTO } from './userDTO/user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post('/login')
  async login(@Body() userLogin: UserDTO) {
    try {
      const login = await this.userService.login(userLogin);
      if (login) {
        return 'Logado';
      }
    } catch (error) {
      throw new UnauthorizedException('Usuário ou senha não existem');
    }
  }

  @Post()
  async register(@Body() userRequest: UserDTO) {
    try {
      await this.userService.create(userRequest);
      return 'User Created';
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.CONFLICT,
          error: 'Usuário já existe',
        },
        HttpStatus.CONFLICT,
        {
          cause: error,
        },
      );
    }
  }
  @Delete(':user')
  async remove(@Param('user') user: string) {
    try {
      await this.userService.delete(user);
      return 'User Deleted';
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          error: 'Usuário não Existe',
        },
        HttpStatus.BAD_REQUEST,
        {
          cause: error,
        },
      );
    }
  }

  @Get()
  async listAll() {
    try {
      return await this.userService.listAll();
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          error: 'Erro ao listar usuários',
        },
        HttpStatus.BAD_REQUEST,
        {
          cause: error,
        },
      );
    }
  }
}
