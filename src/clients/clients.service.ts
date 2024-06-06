import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientsEntity } from './clients.entity';
import { Repository } from 'typeorm';
import { ClientDTO } from './clientDTO/cliente.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(ClientsEntity)
    private readonly clientsRepository: Repository<ClientsEntity>,
    private userService: UsersService) {}

  async listAthletesByUser(id_user: number) {
    return await this.clientsRepository.find({
      select: {
        id_client: true,
        fullName: true,
        age: true,
        email: true,
        phone: true,
        id_training: true,
        ids_sheets: true,
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

  async create(newClient: ClientDTO, id_user: any) {
    newClient.id_user = await this.userService.getUserInfo(id_user);
    const client = this.clientsRepository.create(newClient);
    return await this.clientsRepository.save(client);
  }

  async update(updateClient: ClientDTO) {
    return await this.clientsRepository
      .findOneBy({ email: updateClient.email })
      .then(async (result) => {
        await this.clientsRepository.update(
          { email: result.email },
          updateClient,
        );
      });
  }
  async remove(id: number) {
    return await this.clientsRepository
      .findOneBy({ id_client: id })
      .then(async (result) => {
        await this.clientsRepository.update(
          { id_client: result.id_client },
          { isActive: false },
        );
      });
  }

}
