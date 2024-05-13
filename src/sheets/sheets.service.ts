import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SheetsEntity } from './sheets.entity';
import { Repository } from 'typeorm';
import { CreateSheetDTO } from './sheetsDTO/createSheetDTO.dto';
import { ExercisesService } from '../exercises/exercises.service';
import { ReturnSheetByClient } from './sheetsDTO/returnSheetByClient';
import { ListSheetsDTO } from './sheetsDTO/listSheetsDTO.dto';

@Injectable()
export class SheetsService {
  constructor(
    @InjectRepository(SheetsEntity)
    private readonly sheetsRepository: Repository<SheetsEntity>,
    private readonly exerciseService: ExercisesService,
  ) {}

  async listSheets() {
    const listSheets: SheetsEntity[] = await this.sheetsRepository.find({
      select: {
        id_sheet: true,
        id_exercise: true,
        sheet_desc: true,
        sheet_name: true,
      },
    });
    const listSheetWithExercises = [];
    for (const sheet of listSheets) {
      const sheetWithExerciseInfo = new ListSheetsDTO();
      sheetWithExerciseInfo.id_sheet = sheet.id_sheet;
      sheetWithExerciseInfo.sheet_desc = sheet.sheet_desc;
      sheetWithExerciseInfo.sheet_name = sheet.sheet_name;
      sheetWithExerciseInfo.exercise = await this.getExerciseInfo(
        sheet.id_exercise,
      );
      listSheetWithExercises.push(sheetWithExerciseInfo);
    }
    return listSheetWithExercises;
  }

  async getExerciseInfo(ids: string) {
    const listExercise = [];
    const idSheets = ids.split(',');
    for (const id of idSheets) {
      console.log(id);
      const exercise = await this.exerciseService.getExercise(parseInt(id));
      listExercise.push(exercise);
    }
    return listExercise;
  }
  async listSheetByClient(id_sheet: number) {
    const sheetToFront = new ReturnSheetByClient();
    const sheet = await this.sheetsRepository.findOne({
      where: {
        id_sheet: id_sheet,
      },
      relations: ['id_client'],
    });
    const listExercises = [];
    for (const id of sheet.id_exercise.split(',')) {
      const exercisesDetails = await this.exerciseService.getExercise(
        parseInt(id),
      );
      listExercises.push(exercisesDetails);
    }
    sheetToFront.exercises = listExercises;
    sheetToFront.id_sheet = sheet.id_sheet;
    return sheetToFront;
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
