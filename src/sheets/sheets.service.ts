/* eslint-disable prefer-const */
import { Injectable, NotFoundException, ParseIntPipe } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SheetsEntity } from './sheets.entity';
import { Repository } from 'typeorm';
import { CreateSheetDTO } from './sheetsDTO/createSheetDTO.dto';
import { ExercisesService } from '../exercises/exercises.service';
import { ClientsService } from '../clients/clients.service';
import { ExercisesEntity } from '../exercises/exercises.entity';
import { UpdateSheetDTO } from './sheetsDTO/updateSheetDTO';
import { ReturnSheetToFront } from './sheetsDTO/returnSheetToFront';

@Injectable()
export class SheetsService {
  constructor(
    @InjectRepository(SheetsEntity)
    private readonly sheetsRepository: Repository<SheetsEntity>,
    private readonly exerciseService: ExercisesService,
    private readonly clientService: ClientsService,
  ) {}

  async listSheets() {
    return await this.sheetsRepository.find({
      select: {
        id_sheet: true,
      },
      relations: ['id_client'],
    });
  }
  async listSheetByClient(id_sheet: number) {
    const sheetToFront = new ReturnSheetToFront();
    const sheet = await this.sheetsRepository.findOne({
      where: {
        id_sheet: id_sheet,
      },
      relations: ['id_client'],
    });
    let listExercises = [];
    for (const id of sheet.id_exercise.split(',')) {
      const exercisesDetails = await this.exerciseService.getExercise(
        parseInt(id),
      );
      listExercises.push(exercisesDetails);
    }
    console.log(listExercises);
    sheetToFront.exercises = listExercises;
    sheetToFront.id_sheet = sheet.id_sheet;
    sheetToFront.id_client = sheet.id_client;

    return sheetToFront;
  }

  async create(newSheet: CreateSheetDTO) {
    try {
      const sheet = new SheetsEntity();
      sheet.id_client = await this.clientService.clientInformation(
        newSheet.id_client,
      );
      sheet.id_exercise = newSheet.id_exercise;
      const addSheet = await this.sheetsRepository.save(sheet);
      await this.clientService.updateSheet(addSheet);
    } catch (error) {
      console.log(error);
    }
  }

  async updateSheet(updateSheet: UpdateSheetDTO) {
    try {
      const sheet = new SheetsEntity();
      sheet.id_client = await this.clientService.clientInformation(
        updateSheet.id_client,
      );
      sheet.id_exercise = updateSheet.id_exercise;
      await this.sheetsRepository.update(
        {
          id_sheet: updateSheet.id_sheet,
        },
        sheet,
      );
      await this.clientService.updateSheet(sheet);
    } catch (error) {
      console.log(error);
    }
  }
}
