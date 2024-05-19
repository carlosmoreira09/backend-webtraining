import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Headers,
} from '@nestjs/common';
import { ExercisesService } from './exercises.service';
import { ExerciseDTO } from './exerciseDTO/exercise.dto';
import { GeneralReturnDTO } from '../responseDTO/generalReturn.dto';

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
      return await this.exerciseService.listExerciseByType(type);
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
  async saveExercise(
    @Body() newExercise: ExerciseDTO,
    @Headers('id_client') id_client: number,
  ) {
    try {
      await this.exerciseService.create(newExercise, id_client);
      const returnMessage: GeneralReturnDTO = new GeneralReturnDTO();
      returnMessage.message = 'Exercicio Adicionado';
      returnMessage.status = 200;
      return returnMessage;
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

  @Delete(':id')
  async delete(@Param('id') id: number) {
    try {
      await this.exerciseService.remove(id);
      const returnMessage: GeneralReturnDTO = new GeneralReturnDTO();
      returnMessage.message = 'Exercicio Deletado';
      returnMessage.status = 200;
      return returnMessage;
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.CONFLICT,
          error: 'Erro ao deletar Exercício',
        },
        HttpStatus.CONFLICT,
        {
          cause: error,
        },
      );
    }
  }
}
