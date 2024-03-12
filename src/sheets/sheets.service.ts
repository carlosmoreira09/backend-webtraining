import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SheetsEntity } from './sheets.entity';
import { Repository } from 'typeorm';
import { CreateSheetDTO } from './sheetsDTO/createSheetDTO.dto';

@Injectable()
export class SheetsService {
  constructor(
    @InjectRepository(SheetsEntity)
    private readonly sheetsRepository: Repository<SheetsEntity>,
  ) {}

  async listSheets() {
    return await this.sheetsRepository.find({
      select: {
        id_sheet: true,
        exercises: true,
      },
      relations: ['id_client'],
    });
  }
  async listSheetByClient(id_client: number) {
    return await this.sheetsRepository.findOne({
      where: {
        id_sheet: id_client,
      },
      relations: ['id_client'],
    });
  }

  async create(newSheet: CreateSheetDTO) {
    try {
      const sheet = this.sheetsRepository.create(newSheet);
      return await this.sheetsRepository.save(sheet);
    } catch (error) {
      console.log(error);
    }
  }
}
