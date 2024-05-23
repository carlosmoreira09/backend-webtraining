import { Injectable, UnauthorizedException } from '@nestjs/common';
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

  async getUserInfo(id: string) {
    return await this.userRepository.findOne({
      select: {
        id_user: true,
        fullName: true,
        username: true,
        email: true,
      },
      where: { username: id },
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

  async login(userData: UserDTO): Promise<UsersEntity | undefined> {
    return await this.userRepository.findOneBy({
      username: userData.username,
    });
  }
}
