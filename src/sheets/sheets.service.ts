import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SheetsEntity } from './sheets.entity';
import { Repository } from 'typeorm';
import { CreateSheetDTO } from './sheetsDTO/createSheetDTO.dto';
import { ExercisesService } from '../exercises/exercises.service';
import { ListSheetsDTO } from './sheetsDTO/listSheetsDTO.dto';
import { UsersService } from '../users/users.service';
import { GeneralReturnDTO } from '../responseDTO/generalReturn.dto';
import { ClientsService } from '../clients/clients.service';
import { ExercisesEntity } from '../exercises/exercises.entity';

@Injectable()
export class SheetsService {
  constructor(
    @InjectRepository(SheetsEntity)
    private readonly sheetsRepository: Repository<SheetsEntity>,
    private readonly exerciseService: ExercisesService,
    private readonly userService: UsersService,
    @Inject(forwardRef(() => ClientsService))
    private readonly clientService: ClientsService,
  ) {
  }

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
    });
    const listSheetWithExercises: ListSheetsDTO[] = [];

    for (const sheet of listSheets) {
      let sheetWithExerciseInfo: ListSheetsDTO;

      const trainingA: ExercisesEntity[] = await this.getExerciseInfo(
        sheet.training_a,
      );
      const trainingB: ExercisesEntity[] = await this.getExerciseInfo(
        sheet.training_b,
      );
      const trainingC: ExercisesEntity[] = await this.getExerciseInfo(
        sheet.training_c,
      );
      const trainingD: ExercisesEntity[] = await this.getExerciseInfo(
        sheet.training_d,
      );
      // eslint-disable-next-line prefer-const
      sheetWithExerciseInfo = {
        ...sheet,
        training_a: trainingA,
        training_b: trainingB,
        training_c: trainingC,
        training_d: trainingD,
      };
      listSheetWithExercises.push(sheetWithExerciseInfo);
    }

    return listSheetWithExercises;
  }

  async updateSheet(updateSheet: CreateSheetDTO) {
    await this.sheetsRepository
      .findOne({
        where: {
          id_sheet: updateSheet.id_sheet,
        },
      })
      .then(async (result) => {
        await this.sheetsRepository.update(
          {
            id_sheet: result.id_sheet,
          },
          updateSheet,
        );
      });
    return {
      message: 'Planilha Atualizada',
      status: 200,
    };
  }

  async getExerciseInfo(ids: string): Promise<ExercisesEntity[]> {
    const listExercise: ExercisesEntity[] = [];

    if (ids.length == 0) {
      return listExercise;
    }
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
    let sheetToFront: ListSheetsDTO;
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
          training_type: true,
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
    const trainingA: ExercisesEntity[] = await this.getExerciseInfo(
      sheet.training_a,
    );
    const trainingB: ExercisesEntity[] = await this.getExerciseInfo(
      sheet.training_b,
    );
    const trainingC: ExercisesEntity[] = await this.getExerciseInfo(
      sheet.training_c,
    );
    const trainingD: ExercisesEntity[] = await this.getExerciseInfo(
      sheet.training_d,
    );

    // eslint-disable-next-line prefer-const
    sheetToFront = {
      ...sheet,
      training_a: trainingA,
      training_b: trainingB,
      training_c: trainingC,
      training_d: trainingD,
    };

    return sheetToFront;
  }

  async create(newSheet: CreateSheetDTO, id_user: number): Promise<any> {
    try {
      const id_client = newSheet.id_client;
      newSheet.admin = await this.userService.getUserInfo(id_user);
      if (newSheet.id_client != null) {
        newSheet.id_client = await this.clientService.getClient(
          parseInt(id_client),
        );
      }
      const sheet = this.sheetsRepository.create(newSheet);
      const addSheet = await this.sheetsRepository.save(sheet);
      if (addSheet.id_client != null) {
        await this.clientService.saveSheetClient(addSheet.id_sheet, id_client);
      }

      return {
        message: 'Planilha Adicionada',
        status: 200,
        id: addSheet.id_sheet,
      };
    } catch (error) {
      throw new Error(error);
    }
  }

  async delete(id_sheet: number): Promise<GeneralReturnDTO> {
    await this.sheetsRepository
      .findOneBy({ id_sheet: id_sheet })
      .then(async (result) => {
        await this.sheetsRepository.update(
          { id_sheet: result.id_sheet },
          { deletedAt: new Date().toISOString() },
        );
      });
    return {
      status: 200,
      message: 'Planilha Deletada',
    };
  }
}
