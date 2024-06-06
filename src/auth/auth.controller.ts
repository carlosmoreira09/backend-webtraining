import {
  Body,
  Controller,
  Get,
  Headers,
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
import { ExercisesService } from '../exercises/exercises.service';
import { UsersEntity } from '../users/users.entity';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private exerciseService: ExercisesService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('register')
  async register(
    @Body() data: NewUserDTO,
    @Headers('user_role') user_role: string,
  ) {
    if (user_role === 'admin') {
      try {
        return await this.authService.register(data);
      } catch(error) {
        throw new HttpException(
          {
            statusCode: HttpStatus.BAD_REQUEST,
            error: 'Usuário sem acesso',
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
          statusCode: HttpStatus.BAD_REQUEST,
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
  async profile(): Promise<any> {
    return await this.authService.profile('cesmoreira');
  }

  @UseGuards(JwtAuthGuard)
  @Get(':type')
  async listExerciseByType(@Param('type') type: string) {
    try {
      return await this.exerciseService.listExerciseByType(type);
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          error: 'Tipo não encontrado',
        },
        HttpStatus.BAD_REQUEST,
        {
          cause: error,
        },
      );
    }
  }
}
