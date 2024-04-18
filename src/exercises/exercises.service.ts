import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExercisesEntity } from './exercises.entity';
import { Repository } from 'typeorm';
import { ExerciseDTO } from './exerciseDTO/exercise.dto';

@Injectable()
export class ExercisesService {
  constructor(
    @InjectRepository(ExercisesEntity)
    private readonly exerciseRepository: Repository<ExercisesEntity>,
  ) {}
  async create(newExercise: ExerciseDTO) {
    const exercise = this.exerciseRepository.create(newExercise);
    return await this.exerciseRepository.save(exercise);
  }
  async listAllExercises() {
    try {
      return await this.exerciseRepository.find({
        select: {
          id_exercise: true,
          exercise: true,
          exercise_type: true,
        },
      });
    } catch (error) {
      return new Error();
    }
  }

  async listExerciseByType(type: string) {
    return await this.exerciseRepository.find({
      select: {
        id_exercise: true,
        exercise: true,
        exercise_type: true,
        exercise_desc: true,
      },
      where: {
        exercise_type: type,
      },
    });
  }

  async getExercise(id: number) {
    return await this.exerciseRepository.findOneBy({
      id_exercise: id,
    });
  }
}
