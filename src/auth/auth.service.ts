import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(data: any) {
    const checkUserExists = await this.userService.getUserInfo(data);
    if (checkUserExists) {
      throw new HttpException('User already registered', HttpStatus.FOUND);
    }
    const createUser = await this.userService.create(data);
    if (createUser) {
      return {
        statusCode: 200,
        message: 'Register Successfull',
      };
    }
  }

  async login(data: any) {
    const checkUserExists = await this.userService.getUserInfo(data.username);

    if (!checkUserExists) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    if (checkUserExists) {
      const accessToken = this.generateJWT({
        id: checkUserExists.id_user,
        sub: checkUserExists.username,
        name: checkUserExists.fullName,
        email: checkUserExists.email,
      });

      return {
        statusCode: 200,
        message: 'Logged',
        accessToken: accessToken,
      };
    } else {
      throw new HttpException(
        'User or password not match',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
  generateJWT(payload: any) {
    return this.jwtService.sign(payload);
  }

  async profile(user_id: string) {
    return await this.userService.getUserInfo(user_id);
  }
  async validateContributor(reviewData: any) {
    const review = await this.userService.getUserInfo(reviewData.username);
    if (reviewData.password !== review.password) {
      return null;
    }
    return review;
  }
  public async validate(token: string): Promise<boolean | never> {
    const decoded = await this.jwtService.verify(token);
    console.log(decoded);
    if (!decoded) {
      throw new UnauthorizedException();
    }
    const user = await this.userService.getUserInfo(decoded.username);
    if (!user) {
      throw new UnauthorizedException();
    }
    return true;
  }
  public async decode(token: string): Promise<any> {
    return this.jwtService.decode(token, null);
  }
}
