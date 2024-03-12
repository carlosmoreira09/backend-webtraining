import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { ExercisesService } from './exercises.service';
import { ExerciseDTO } from './exerciseDTO/exercise.dto';

@Controller('exercises')
export class ExercisesController {
  constructor(private readonly exerciseService: ExercisesService) {}
  @Get()
  async listAll() {
    return await this.exerciseService.listAllExercises();
  }
  @Get(':type')
  async listExerciseByType(@Param('type') type: string) {
    try {
      return this.exerciseService.listExerciseByType(type);
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          error: 'Tipo não encontrado',
        },
        HttpStatus.BAD_REQUEST,
        {
          cause: error,
        },
      );
    }
  }

  @Post()
  async saveExercise(@Body() newExercise: ExerciseDTO) {
    try {
      await this.exerciseService.create(newExercise);
      return 'Exercicio Adicionado';
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          error: 'Erro ao Adicionar exercicio',
        },
        HttpStatus.BAD_REQUEST,
        {
          cause: error,
        },
      );
    }
  }
}
