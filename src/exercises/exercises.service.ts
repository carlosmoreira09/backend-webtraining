import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExercisesEntity } from './exercises.entity';
import { Repository } from 'typeorm';
import { ExerciseDTO } from './exerciseDTO/exercise.dto';
import { GeneralReturnDTO } from '../responseDTO/generalReturn.dto';
import { UsersService } from '../users/users.service';

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
    console.log(exercise);
    await this.exerciseRepository.save(exercise);
    return {
      status: 201,
      message: 'Exercício Salvo',
    };
  }

  async listAllExercises(): Promise<
    Promise<ExercisesEntity[]> | Promise<Error>
  > {
    try {
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
    } catch (error) {
      return new Error();
    }
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
    this.exerciseRepository
      .findOneBy({ id_exercise: id_exercicio })
      .then(async (result) => {
        await this.exerciseRepository.remove(result);
      });
    return {
      status: 200,
      message: 'Exercise removido',
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
