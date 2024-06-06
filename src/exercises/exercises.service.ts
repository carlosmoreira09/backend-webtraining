import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExercisesEntity } from './exercises.entity';
import { Repository } from 'typeorm';
import { ExerciseDTO } from './exerciseDTO/exercise.dto';
import { ClientsService } from '../clients/clients.service';
import { GeneralReturnDTO } from '../responseDTO/generalReturn.dto';

@Injectable()
export class ExercisesService {
  constructor(
    @InjectRepository(ExercisesEntity)
    private readonly exerciseRepository: Repository<ExercisesEntity>,
    private clientService: ClientsService,
  ) {}
  async create(
    newExercise: ExerciseDTO,
    id: number,
  ): Promise<GeneralReturnDTO> {
    newExercise.id_client = await this.clientService.getClient(id);
    const exercise: ExercisesEntity =
      this.exerciseRepository.create(newExercise);
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

  async listExerciseByType(type: string): Promise<ExercisesEntity[]> {
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
    return await this.exerciseRepository.findOneBy({
      id_exercise: id,
    });
  }
}
