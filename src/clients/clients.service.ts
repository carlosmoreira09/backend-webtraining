import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientsEntity } from './clients.entity';
import { Repository } from 'typeorm';
import { NewClientDTO } from './clientDTO/cliente.dto';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { GeneralReturnDTO } from '../responseDTO/generalReturn.dto';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(ClientsEntity)
    private readonly clientsRepository: Repository<ClientsEntity>,
    private userService: UsersService,
  ) {}

  async listAthletesByUser(id_user: number) {
    return await this.clientsRepository.find({
      select: {
        id_client: true,
        fullName: true,
        age: true,
        email: true,
        phone: true,
        training_type: true,
        id_sheets: true,
        old_sheets: true,
        admin: {
          id_user: true,
          username: true,
          fullName: true,
          email: true,
        },
      },
      where: {
        isActive: true,
        deletedAt: null,
        admin: {
          id_user: id_user,
        },
      },
      relations: {
        admin: true,
      },
    });
  }

  async getClient(id: number) {
    return await this.clientsRepository.findOne({
      where: {
        id_client: id,
      },
    });
  }

  async validadeUserExist(user: string) {
    return await this.clientsRepository.findOne({
      where: {
        email: user,
      },
    });
  }

  async create(
    newClient: NewClientDTO,
    id_user: number,
  ): Promise<GeneralReturnDTO> {
    newClient.admin = await this.userService.getUserInfo(id_user);
    if (!newClient.admin) {
      throw new HttpException('Usuário não existe', HttpStatus.FOUND);
    }
    const checkUserExists = await this.validadeUserExist(newClient.email);
    if (checkUserExists) {
      throw new HttpException('Email já existe', HttpStatus.FOUND);
    }
    const newPassword = await bcrypt.hash(newClient.password, 12);
    const newUser: NewClientDTO = { ...newClient, password: newPassword };
    const createUser = this.clientsRepository.create(newUser);
    const user = await this.clientsRepository.save(createUser);
    console.log(user);
    if (user) {
      return {
        status: 200,
        message: 'Cliente Cadastrado com sucesso',
      };
    }
  }

  async update(updateClient: NewClientDTO) {
    return await this.clientsRepository
      .findOneBy({ email: updateClient.email })
      .then(async (result) => {
        await this.clientsRepository.update(
          { email: result.email },
          updateClient,
        );
      });
  }
  async saveSheetClient(id_sheet: number, id_client: number) {
    try {
      this.clientsRepository
        .findOneBy({ id_client: id_client })
        .then(async (result) => {
          await this.clientsRepository.update(
            { id_client: result.id_client },
            { id_sheets: id_sheet },
          );
        });
    } catch (error) {
      throw new Error(error);
    }
  }

  async remove(id: number): Promise<GeneralReturnDTO> {
    await this.clientsRepository
      .findOneBy({ id_client: id })
      .then(async (result) => {
        await this.clientsRepository.update(
          { id_client: result.id_client },
          { isActive: false, deletedAt: new Date() },
        );
      });
    return {
      status: 200,
      message: 'Cliente Deletado com sucesso',
    };
  }
}
