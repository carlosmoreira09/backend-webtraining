import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { JwtAuthGuard } from './jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() data: any) {
    try {
      await this.authService.register(data);
      return 'registrado';
    } catch (error) {
      return error;
    }
  }
  @Post('login')
  async login(@Body() data: any) {
    try {
      return await this.authService.login(data);
    } catch (error) {
      return error;
    }
  }
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async profile() {
    return await this.authService.profile('carlos');
  }
}