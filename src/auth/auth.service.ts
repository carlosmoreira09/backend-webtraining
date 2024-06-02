import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { newUser, UserDTO } from '../users/userDTO/user.dto';
import { UsersEntity } from '../users/users.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(data: newUser) {
    const checkUserExists = await this.userService.validadeUserExist(
      data.username,
    );
    if (checkUserExists) {
      throw new HttpException('User already registered', HttpStatus.FOUND);
    }
    const newPassword = await bcrypt.hash(data.password, 12);
    const newUser = { ...data, password: newPassword };
    const createUser = await this.userService.create(newUser);
    if (createUser) {
      return {
        statusCode: 200,
        message: 'Register Successfull',
      };
    }
  }

  async login(data: UserDTO) {
    const checkUserExists = await this.userService.validadeUserExist(
      data.username,
    );

    if (!checkUserExists) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const checkPassword = await this.comparePassword(
      data.password,
      checkUserExists.password,
    );
    if (!checkPassword) {
      throw new UnauthorizedException();
    }
    if (checkUserExists) {
      const accessToken = this.generateJWT({
        id: checkUserExists.id_user,
        username: checkUserExists.username,
        name: checkUserExists.fullName,
        email: checkUserExists.email,
        role: checkUserExists.userType,
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
    const review = await this.userService.validadeUserExist(
      reviewData.username,
    );

    const isMatch = await this.comparePassword(
      reviewData.password,
      review.password,
    );
    if (!isMatch) {
      throw new UnauthorizedException();
    }
    return review;
  }
  async comparePassword(password: string, hash: string) {
    return await bcrypt.compare(password, hash);
  }
  public async validate(token: string): Promise<boolean | never> {
    const decoded = await this.jwtService.verify(token);
    const user: UsersEntity = await this.userService.validadeUserExist(
      decoded.username,
    );
    if (!decoded || !user) {
      throw new UnauthorizedException();
    }
    return true;
  }
  public async decode(token: string): Promise<any> {
    return this.jwtService.decode(token, null);
  }
}