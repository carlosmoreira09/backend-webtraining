import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { NewUserDTO, UserDTO } from '../users/userDTO/user.dto';
import { UsersEntity } from '../users/users.entity';
import { GeneralReturnDTO } from '../responseDTO/generalReturn.dto';
import { ClientsService } from '../clients/clients.service';
import { ClientsEntity } from 'src/clients/clients.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private clientService: ClientsService,
    private jwtService: JwtService,
  ) {}

  async register(data: NewUserDTO): Promise<GeneralReturnDTO> {
    const checkUserExists = await this.userService.validadeUserExist(
      data.username,
    );
    const checkEmailExists = await this.userService.validadeUserExist(
      data.email,
    );
    if (checkUserExists) {
      throw new HttpException('Usuario já existe', HttpStatus.FOUND);
    }
    if (checkEmailExists) {
      throw new HttpException('Email já existe', HttpStatus.FOUND);
    }
    const newPassword = await bcrypt.hash(data.password, 12);
    const newUser: UserDTO = { ...data, password: newPassword };
    const createUser = await this.userService.create(newUser);
    if (createUser) {
      return {
        status: 200,
        message: 'Cliente Cadastrado com sucesso',
      };
    }
  }

  async login(data: UserDTO) {
    let checkUserExists: UsersEntity | ClientsEntity;
    if (data.isUser) {
      checkUserExists = (await this.clientService.validadeUserExist(
        data.username,
      )) as unknown as ClientsEntity;
    }
    if (!data.isUser) {
      checkUserExists = (await this.userService.validadeUserExist(
        data.username,
      )) as UsersEntity;
    }
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
    let accessToken: string;
    if (!data.isUser && checkUserExists) {
      if (!(checkUserExists instanceof ClientsEntity)) {
        accessToken = this.generateJWT({
          id: checkUserExists.id_user,
          username: checkUserExists.username,
          name: checkUserExists.fullName,
          email: checkUserExists.email,
          role: checkUserExists.userType,
        });
      }
      return {
        statusCode: 200,
        message: 'Logged',
        accessToken: accessToken,
      };
    }

    if (data.isUser && checkUserExists) {
      if (!(checkUserExists instanceof UsersEntity)) {
        accessToken = this.generateJWT({
          id: checkUserExists.id_client,
          username: checkUserExists.admin.username,
          name: checkUserExists.fullName,
          email: checkUserExists.email,
          role: checkUserExists.userType,
        });
      }

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

  async profile(user_id: number) {
    const user = await this.userService.getUserInfo(user_id);
    delete user.password;
    return user;
  }

  async validateContributor(reviewData: any) {
    let review: UsersEntity | ClientsEntity;
    review = await this.clientService.validadeUserExist(reviewData.username);
    if (!review) {
      review = await this.userService.validadeUserExist(reviewData.username);
    }
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
    let user: UsersEntity | ClientsEntity;
    if (decoded.role === 'user') {
      user = (await this.clientService.validadeUserExist(
        decoded.email,
      )) as ClientsEntity;
    } else {
      user = (await this.userService.validadeUserExist(
        decoded.username,
      )) as UsersEntity;
    }

    if (!decoded || !user) {
      throw new UnauthorizedException();
    }
    return true;
  }

  public async decode(token: string): Promise<any> {
    return this.jwtService.decode(token, null);
  }
}
