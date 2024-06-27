import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { LoggingMiddleware } from './middlewares/logging-middleware';
import { DatabaseModule } from './config/database.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        ttl: 30000,
        limit: 100,
      },
    ]),
    ConfigModule.forRoot(),
    DatabaseModule,
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
