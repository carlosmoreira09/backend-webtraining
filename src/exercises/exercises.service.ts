import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExercisesEntity } from './exercises.entity';
import { Repository } from 'typeorm';
import { ExerciseDTO } from './exerciseDTO/exercise.dto';
import { GeneralReturnDTO } from '../responseDTO/generalReturn.dto';
import { UsersService } from '../users/users.service';
import { File } from '@nest-lab/fastify-multer';

@Injectable()
export class ExercisesService {
  constructor(
    @InjectRepository(ExercisesEntity)
    private readonly exerciseRepository: Repository<ExercisesEntity>,
    private userService: UsersService,
  ) {}

  async create(
    newExercise: ExerciseDTO,
    id: number,
  ): Promise<GeneralReturnDTO> {
    newExercise.admin = await this.userService.getUserInfo(id);
    const exercise: ExercisesEntity =
      this.exerciseRepository.create(newExercise);
    await this.exerciseRepository.save(exercise);
    return {
      status: 200,
      message: 'Exercício Salvo',
    };
  }

  async listAllExercises(): Promise<ExercisesEntity[]> {
    return await this.exerciseRepository.find({
      select: {
        admin: {
          id_user: true,
          fullName: true,
          username: true,
          email: true,
        },
      },
      relations: {
        admin: true,
      },
      order: {
        id_exercise: 'DESC',
      },
    });
  }

  async saveVideo(fileName: File): Promise<GeneralReturnDTO> {
    const id_exercise = parseInt(fileName.originalname.split('__')[0]);
    const videoName = fileName.filename;
    await this.exerciseRepository
      .findOne({
        where: {
          id_exercise: id_exercise,
        },
      })
      .then(async (result) => {
        await this.exerciseRepository.update(
          {
            id_exercise: result.id_exercise,
          },
          {
            videoName: videoName,
          },
        );
      });
    return {
      message: 'Video salvo',
      status: 200,
    };
  }

  async listExerciseByType(
    type: string,
    id_user: number,
  ): Promise<ExercisesEntity[]> {
    return await this.exerciseRepository.find({
      select: {
        id_exercise: true,
        exercise: true,
        exercise_type: true,
        exercise_desc: true,
        repetition: true,
        videoName: true,
        admin: {
          id_user: true,
          fullName: true,
          username: true,
          email: true,
        },
      },
      where: {
        exercise_type: type,
        admin: {
          id_user: id_user,
        },
      },
      relations: {
        admin: true,
      },
    });
  }

  async remove(id_exercicio: number): Promise<GeneralReturnDTO> {
    await this.exerciseRepository
      .findOne({
        where: {
          id_exercise: id_exercicio,
        },
      })
      .then(async (result) => {
        await this.exerciseRepository.delete({
          id_exercise: result.id_exercise,
        });
      });
    return {
      status: 200,
      message: 'Exercício removido',
    };
  }

  async updateExercise(updateExercise: ExerciseDTO) {
    await this.exerciseRepository
      .findOne({
        where: {
          id_exercise: updateExercise.id_exercise,
        },
      })
      .then(async (result) => {
        await this.exerciseRepository.update(
          {
            id_exercise: result.id_exercise,
          },
          updateExercise,
        );
      });
    return {
      status: 200,
      message: 'Exercicio Alterado',
    };
  }

  async getExercise(id: number) {
    const exercise = await this.exerciseRepository.findOneBy({
      id_exercise: id,
    });
    if (!exercise) {
      return undefined;
    }
    return exercise;
  }
}
