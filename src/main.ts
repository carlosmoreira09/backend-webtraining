import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from '@fastify/helmet';
import fastifyCsrfProtection from '@fastify/csrf-protection';
import secureSession from '@fastify/secure-session';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import multer from 'fastify-multer';

async function bootstrap() {
  const configService: ConfigService = new ConfigService();
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  await app.register(helmet);
  await app.register(fastifyCsrfProtection);
  await app.register(secureSession, {
    secret: configService.get('SESSION_SECRET'),
    salt: configService.get('SESSION_SALT'),
  });
  await app.register(multer.contentParser);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      //disableErrorMessages: true,
    }),
  );
  app.enableCors({
    origin: true,
    methods: process.env.METHODS_ALLOW,
    credentials: true,
  });
  app.setGlobalPrefix('api');
  await app.listen(3000);
}

bootstrap().then();
