import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'username' });
  }

  async validate(username: any, password: any) {
    const review = await this.authService.validateContributor({
      username,
      password,
    });
    if (!review) {
      throw new UnauthorizedException();
    }
    return review;
  }
}
