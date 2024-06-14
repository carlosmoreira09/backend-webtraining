import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from './users.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserDTO } from './userDTO/user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly userRepository: Repository<UsersEntity>,
  ) {
  }

  async create(userRequest: UserDTO) {
    const user = this.userRepository.create(userRequest);
    return await this.userRepository.save(user);
  }

  async delete(user: string) {
    return await this.userRepository.update(
      { username: user },
      { isActive: false },
    );
  }

  async validadeUserExist(user: string) {
    if (user.includes('@')) {
      return await this.userRepository.findOne({
        where: {
          email: user,
        },
      });
    } else {
      return await this.userRepository.findOne({
        where: {
          username: user,
        },
      });
    }
  }

  async getUserInfo(id: number): Promise<UsersEntity> {
    return await this.userRepository.findOne({
      where: { id_user: id },
    });
  }

  async update(userRequest: UserDTO) {
    let checkPassword: boolean;
    await this.userRepository
      .findOneBy({ username: userRequest.username })
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
      { username: userRequest.username },
      userRequest,
    );
  }
}
