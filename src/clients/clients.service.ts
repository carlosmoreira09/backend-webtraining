import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientsEntity } from './clients.entity';
import { Repository } from 'typeorm';
import { ClientModelFront, NewClientDTO } from './clientDTO/cliente.dto';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { GeneralReturnDTO } from '../responseDTO/generalReturn.dto';
import { SheetsService } from '../sheets/sheets.service';
import { ListSheetsDTO } from '../sheets/sheetsDTO/listSheetsDTO.dto';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(ClientsEntity)
    private readonly clientsRepository: Repository<ClientsEntity>,
    private userService: UsersService,
    @Inject(forwardRef(() => SheetsService))
    private readonly sheetService: SheetsService,
  ) {}

  async listAthletesByUser(id_user: number) {
    const listAthlete: ClientsEntity[] = await this.clientsRepository.find({
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
        admin: {
          id_user: id_user,
        },
      },
      relations: {
        admin: true,
      },
    });
    const listAthleteToFront: ClientModelFront[] = [];
    for (const athlete of listAthlete) {
      let sheet: ListSheetsDTO;
      let clientWithSheet: ClientModelFront;
      if (athlete.id_sheets) {
        sheet = await this.getSheetById(athlete.id_sheets);
      }
      if (sheet !== undefined) {
        clientWithSheet = {
          ...athlete,
          id_sheets: sheet,
        };
      } else {
        clientWithSheet = {
          ...athlete,
          id_sheets: null,
        };
      }

      listAthleteToFront.push(clientWithSheet);
    }

    return listAthleteToFront;
  }

  async getSheetById(id_sheet: number) {
    return await this.sheetService.listSheetById(id_sheet);
  }

  async getClient(id: number) {
    return await this.clientsRepository.findOne({
      where: {
        id_client: id,
      },
    });
  }

  async updateClient(updateClient: NewClientDTO) {
    await this.clientsRepository
      .findOne({
        where: {
          id_client: updateClient.id_client,
        },
      })
      .then(async (value) => {
        await this.clientsRepository.update(
          {
            id_client: value.id_client,
          },
          {
            fullName: updateClient.fullName,
            age: updateClient.age,
            training_type: updateClient.training_type,
            email: updateClient.email,
            phone: updateClient.phone,
          },
        );
      });
    return {
      message: 'Dados Atualizados',
      status: 200,
    };
  }

  async validadeUserExist(user: string) {
    return await this.clientsRepository.findOne({
      where: {
        email: user,
      },
      relations: {
        admin: true,
      },
    });
  }

  async create(newClient: NewClientDTO): Promise<GeneralReturnDTO> {
    newClient.admin = await this.userService.getUserInfo(newClient.id_user);
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
    if (user) {
      return {
        status: 200,
        message: 'Cliente Cadastrado com sucesso',
      };
    }
  }

  async updateClientSheet(
    id_client: number,
    id_sheet: number,
  ): Promise<GeneralReturnDTO> {
    await this.clientsRepository
      .findOneBy({ id_client: id_client })
      .then(async (value) => {
        await this.clientsRepository.update(
          { id_client: value.id_client },
          { id_sheets: id_sheet },
        );
      });
    return {
      message: 'Cliente Atualizado',
      status: 200,
    };
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
