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

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {
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
}
