import {
  Body,
  Controller,
  Get,
  Headers,
  HttpException,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from '../guards/jwt.guard';
import { NewUserDTO, UserDTO } from '../users/userDTO/user.dto';
import { AuthLocalGuard } from '../guards/auth.guard';
import { UsersEntity } from '../users/users.entity';
import { GeneralReturnDTO } from '../responseDTO/generalReturn.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(JwtAuthGuard)
  @Post('register')
  async register(
    @Body() data: NewUserDTO,
    @Headers('user_role') user_role: string,
  ): Promise<Promise<GeneralReturnDTO> | HttpException> {
    console.log(user_role);
    if (user_role && user_role == 'admin') {
      console.log(user_role);
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
    } else {
      return new HttpException(
        {
          statusCode: HttpStatus.UNAUTHORIZED,
          error: 'Usuário sem acesso',
        },
        HttpStatus.BAD_REQUEST,
        {
          cause: 'Usuário sem acesso',
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
  @Get('profile')
  async profile(@Headers('id_user') id_user: number): Promise<UsersEntity> {
    return await this.authService.profile(id_user);
  }
}
