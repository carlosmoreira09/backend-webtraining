import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from './users.entity';
import { Repository } from 'typeorm';
import { UserDTO } from './userDTO/user.dto';
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
      { user: user },
      { isActive: false },
    );
  }
  async update(userRequest: UserDTO) {
    let checkPassword: boolean;
    await this.userRepository
      .findOneBy({ user: userRequest.user })
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
      { user: userRequest.user },
      userRequest,
    );
  }
  async listAll() {
    return await this.userRepository.find({
      select: {
        user: true,
      },
      where: {
        isActive: true,
      },
    });
  }

  async login(userLogin: UserDTO) {
    let checkPassword: boolean;
    await this.userRepository
      .findOneBy({ user: userLogin.user })
      .then(async (result) => {
        checkPassword = await bcrypt.compare(
          userLogin.password,
          result.password,
        );
      });
    console.log(checkPassword);
    if (!checkPassword) {
      throw new UnauthorizedException();
    }
    return true;
  }
}
