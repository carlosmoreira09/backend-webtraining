import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from './users.entity';
import { Repository } from 'typeorm';
import { UserDTO, UserInfo } from './userDTO/user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly userRepository: Repository<UsersEntity>,
  ) {}
  async create(userRequest: UserDTO) {
    userRequest.password = await bcrypt.hash(userRequest.password, 10);
    const user = this.userRepository.create(userRequest);
    return await this.userRepository.save(user);
  }

  async delete(user: string) {
    return await this.userRepository.update(
      { username: user },
      { isActive: false },
    );
  }

  async getUserInfo(id: number) {
    return await this.userRepository.findOne({
      select: {
        id_user: true,
        fullName: true,
        username: true,
        email: true,
      },
      where: { id_user: id },
    });
  }
  async update(userRequest: UserDTO) {
    let checkPassword: boolean;
    await this.userRepository
      .findOneBy({ username: userRequest.user })
      .then(async (result) => {
        checkPassword = await bcrypt.compare(
          userRequest.password,
          result.password,
        );
        if (!checkPassword) {
          throw new Error();
        }
      });
    return await this.userRepository.update(
      { username: userRequest.user },
      userRequest,
    );
  }
  async listAll() {
    return await this.userRepository.find({
      select: {
        id_user: true,
        fullName: true,
        username: true,
        email: true,
      },
      where: {
        isActive: true,
      },
    });
  }

  async login(userLogin: UserDTO): Promise<UserInfo> {
    let checkPassword: boolean;
    const userInfo = new UserInfo();
    await this.userRepository
      .findOneBy({ username: userLogin.user })
      .then(async (result) => {
        checkPassword = await bcrypt.compare(
          userLogin.password,
          result.password,
        );
        if (!checkPassword) {
          throw new UnauthorizedException();
        }
        userInfo.id_user = result.id_user;
        userInfo.email = result.email;
        userInfo.fullName = result.fullName;
      });

    return userInfo;
  }
}
