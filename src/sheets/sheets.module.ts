import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SheetsEntity } from './sheets.entity';
import { SheetsController } from './sheets.controller';
import { SheetsService } from './sheets.service';

@Module({
  imports: [TypeOrmModule.forFeature([SheetsEntity])],
  controllers: [SheetsController],
  providers: [SheetsService],
})
export class SheetsModule {}