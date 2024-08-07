import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ExercisesService } from './exercises.service';
import { ExerciseDTO } from './exerciseDTO/exercise.dto';
import { JwtAuthGuard } from '../guards/jwt.guard';
import { GeneralReturnDTO } from '../responseDTO/generalReturn.dto';
import { FileInterceptor } from '@nest-lab/fastify-multer';
import { Multer } from 'multer';

@Controller('exercises')
export class ExercisesController {
  constructor(private readonly exerciseService: ExercisesService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async listAll() {
    return await this.exerciseService.listAllExercises();
  }

  @UseGuards(JwtAuthGuard)
  @Post('/uploadVideo')
  @UseInterceptors(FileInterceptor('file'))
  async uploadVideo(@UploadedFile() file: Express.Multer.File) {
    try {
      return await this.exerciseService.saveVideo(file);
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          error: 'Erro ao Salvar Video',
        },
        HttpStatus.BAD_REQUEST,
        {
          cause: error,
        },
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get(':type')
  async listExerciseByType(
    @Param('type') type: string,
    @Headers('id_user') id_user: number,
  ) {
    try {
      return await this.exerciseService.listExerciseByType(type, id_user);
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          error: 'Tipo de Exercicio não encontrado',
        },
        HttpStatus.BAD_REQUEST,
        {
          cause: error,
        },
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async saveExercise(
    @Body() newExercise: ExerciseDTO,
    @Headers('id_user') id_user: number,
  ): Promise<GeneralReturnDTO> {
    try {
      return await this.exerciseService.create(newExercise, id_user);
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

  @UseGuards(JwtAuthGuard)
  @Put()
  async updateExercise(
    @Body() updateExercise: ExerciseDTO,
  ): Promise<GeneralReturnDTO> {
    try {
      return await this.exerciseService.updateExercise(updateExercise);
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          error: 'Erro ao Alterar exercicio',
        },
        HttpStatus.BAD_REQUEST,
        {
          cause: error,
        },
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<GeneralReturnDTO> {
    try {
      return await this.exerciseService.remove(id);
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
