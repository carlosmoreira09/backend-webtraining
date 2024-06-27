import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule } from '../clients/clients.module';
import { ExercisesModule } from '../exercises/exercises.module';
import { SheetsModule } from '../sheets/sheets.module';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';
import { join } from 'path';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [
        ConfigModule,
        ClientsModule,
        ExercisesModule,
        SheetsModule,
        AuthModule,
        UsersModule,
      ],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        entities: [join(process.cwd(), 'dist/**/*.entity.js')],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
  ],
  exports: [DatabaseModule],
})
export class DatabaseModule {}
