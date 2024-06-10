import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SheetsEntity } from './sheets.entity';
import { Repository } from 'typeorm';
import { CreateSheetDTO } from './sheetsDTO/createSheetDTO.dto';
import { ExercisesService } from '../exercises/exercises.service';
import { ListSheetsDTO } from './sheetsDTO/listSheetsDTO.dto';
import { UsersService } from '../users/users.service';
import { ClientsService } from '../clients/clients.service';

@Injectable()
export class SheetsService {
  constructor(
    @InjectRepository(SheetsEntity)
    private readonly sheetsRepository: Repository<SheetsEntity>,
    private readonly exerciseService: ExercisesService,
    private readonly userService: UsersService,
    private readonly clientService: ClientsService,
  ) {}

  async listSheets(id_user: number) {
    const listSheets: SheetsEntity[] = await this.sheetsRepository.find({
      where: {
        admin: {
          id_user: id_user,
        },
      },
      relations: {
        id_client: true,
      },
      order: {
        id_sheet: 'DESC',
      },
    });
    const listSheetWithExercises: ListSheetsDTO[] = [];
    const sheetWithExerciseInfo: ListSheetsDTO = new ListSheetsDTO();

    for (const sheet of listSheets) {
      sheetWithExerciseInfo.id_sheet = sheet.id_sheet;
      sheetWithExerciseInfo.sheet_desc = sheet.sheet_desc;
      sheetWithExerciseInfo.sheet_details = sheet.sheet_details;
      sheetWithExerciseInfo.sheet_name = sheet.sheet_name;
      sheetWithExerciseInfo.id_client = sheet.id_client;
      sheetWithExerciseInfo.training_a = await this.getExerciseInfo(
        sheet.training_a,
      );
      sheetWithExerciseInfo.training_b = await this.getExerciseInfo(
        sheet.training_b,
      );
      sheetWithExerciseInfo.training_c = await this.getExerciseInfo(
        sheet.training_c,
      );
      sheetWithExerciseInfo.training_d = await this.getExerciseInfo(
        sheet.training_d,
      );
      listSheetWithExercises.push(sheetWithExerciseInfo);
    }
    return listSheetWithExercises;
  }

  async getExerciseInfo(ids: string) {
    const listExercise = [];
    const idSheets = ids.split(',');
    for (const id of idSheets) {
      const exercise = await this.exerciseService.getExercise(parseInt(id));
      if (exercise) {
        listExercise.push(exercise);
      }
    }
    return listExercise;
  }
  async listSheetById(id_sheet: number): Promise<ListSheetsDTO> {
    const sheetToFront: ListSheetsDTO = new ListSheetsDTO();
    const sheet = await this.sheetsRepository.findOne({
      select: {
        id_sheet: true,
        sheet_name: true,
        sheet_desc: true,
        sheet_details: true,
        training_a: true,
        training_b: true,
        training_c: true,
        training_d: true,
        id_client: {
          id_client: true,
          fullName: true,
          email: true,
          phone: true,
          old_sheets: true,
          id_training: true,
          age: true,
        },
      },
      where: {
        id_sheet: id_sheet,
      },
      relations: {
        id_client: true,
      },
    });
    const listExercisesA = [];
    const listExercisesB = [];
    const listExercisesC = [];
    const listExercisesD = [];
    for (const id of sheet.training_a.split(',')) {
      const exercisesDetails = await this.exerciseService.getExercise(
        parseInt(id),
      );
      listExercisesA.push(exercisesDetails);
    }
    for (const id of sheet.training_b.split(',')) {
      const exercisesDetails = await this.exerciseService.getExercise(
        parseInt(id),
      );
      listExercisesB.push(exercisesDetails);
    }
    for (const id of sheet.training_c.split(',')) {
      const exercisesDetails = await this.exerciseService.getExercise(
        parseInt(id),
      );
      listExercisesC.push(exercisesDetails);
    }
    for (const id of sheet.training_d.split(',')) {
      const exercisesDetails = await this.exerciseService.getExercise(
        parseInt(id),
      );
      listExercisesD.push(exercisesDetails);
    }
    sheetToFront.training_a = listExercisesA;
    sheetToFront.training_b = listExercisesB;
    sheetToFront.training_c = listExercisesC;
    sheetToFront.training_d = listExercisesD;
    sheetToFront.sheet_desc = sheet.sheet_desc;
    sheetToFront.sheet_details = sheet.sheet_details;
    sheetToFront.sheet_name = sheet.sheet_name;
    sheetToFront.id_sheet = sheet.id_sheet;
    sheetToFront.id_client = sheet.id_client;
    return sheetToFront;
  }

  async create(newSheet: CreateSheetDTO, id_user: number) {
    try {
      const id_client = newSheet.id_client;
      newSheet.admin = await this.userService.getUserInfo(id_user);
      newSheet.id_client = await this.clientService.getClient(
        parseInt(id_client),
      );
      const sheet = this.sheetsRepository.create(newSheet);
      return await this.sheetsRepository.save(sheet);
    } catch (error) {
      throw new Error(error);
    }
  }
  async delete(id_sheet: number) {
    try {
      this.sheetsRepository
        .findOneBy({ id_sheet: id_sheet })
        .then(async (result) => {
          await this.sheetsRepository.update(
            { id_sheet: result.id_sheet },
            { deletedAt: new Date().toISOString() },
          );
        });
    } catch (error) {
      throw new Error(error);
    }
  }
}
