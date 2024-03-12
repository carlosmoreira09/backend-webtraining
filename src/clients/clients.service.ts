import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientsEntity } from './clients.entity';
import { Repository } from 'typeorm';
import { ClientDTO } from './clientDTO/cliente.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(ClientsEntity)
    private readonly clientsRepository: Repository<ClientsEntity>,
  ) {}

  async list() {
    return await this.clientsRepository.find({
      where: { isActive: true },
    });
  }
  async create(newClient: ClientDTO) {
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

  async clientInformation(id: number): Promise<ClientDTO> {
    return await this.clientsRepository.findOneBy({ id_client: id });
  }
}
