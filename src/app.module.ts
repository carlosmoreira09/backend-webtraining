import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';
import * as process from 'process';
import { UserModule } from './users/users.module';
import { ClientsModule } from './clients/clients.module';
import { ExercisesModule } from './exercises/exercises.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { LoggingMiddleware } from './middlewares/logging-middleware';
import { SheetsModule } from './sheets/sheets.module';

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        ttl: 30000,
        limit: 100,
      },
    ]),
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [
        ConfigModule,
        UserModule,
        ClientsModule,
        ExercisesModule,
        SheetsModule,
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
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}
