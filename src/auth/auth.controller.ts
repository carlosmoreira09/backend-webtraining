import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from '../guards/jwt.guard';
import { newUser, UserDTO } from '../users/userDTO/user.dto';
import { AuthLocalGuard } from '../guards/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() data: newUser) {
    try {
      return await this.authService.register(data);
    } catch (error) {
      return error;
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
  async profile() {
    return await this.authService.profile('cesmoreira');
  }
}
