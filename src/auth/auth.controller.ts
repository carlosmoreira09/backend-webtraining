import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from '../guards/jwt.guard';
import { NewUserDTO, UserDTO } from '../users/userDTO/user.dto';
import { AuthLocalGuard } from '../guards/auth.guard';
import { UsersEntity } from '../users/users.entity';
import { GeneralReturnDTO } from '../responseDTO/generalReturn.dto';
import { ClientsEntity } from '../clients/clients.entity';
import { ClientsService } from '../clients/clients.service';
import { loadConfig } from 'tsconfig-paths';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService,
              private clientService: ClientsService,) {
  }

  @UseGuards(JwtAuthGuard)
  @Post('register')
  async register(@Body() data: NewUserDTO): Promise<GeneralReturnDTO> {
    try {
      return await this.authService.register(data);
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          error: 'Dados Inválidos',
        },
        HttpStatus.BAD_REQUEST,
        {
          cause: error,
        },
      );
    }
  }

  @UseGuards(AuthLocalGuard)
  @Post('login')
  async login(@Body() data: UserDTO) {
    try {
      return await this.authService.login(data);
    } catch (error) {
      return error;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile/:id_user')
  async profile(@Param('id_user') id_user: number): Promise<UsersEntity> {
    return await this.authService.profile(id_user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('user-profile/:id_client')
  async userProfile(
    @Param('id_client') id_client: number,
  ): Promise<ClientsEntity> {
    const client = await this.clientService.getClient(id_client);
    delete client.password;
    return client;
  }
}
