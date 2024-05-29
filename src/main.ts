import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from '@fastify/helmet';
import fastifyCsrfProtection from '@fastify/csrf-protection';
import secureSession from '@fastify/secure-session';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { ValidationPipe } from '@nestjs/common';
import { methods, session } from './utils/constants';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  await app.register(secureSession, {
    secret: session.secret,
    salt: session.salt,
  })
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      //disableErrorMessages: true,
    }),
  );
  await app.register(helmet);
  app.enableCors({
    origin: true,
    methods: methods,
    credentials: true,
  });
  app.setGlobalPrefix('api');
  await app.register(fastifyCsrfProtection);
  await app.listen(3000);
}
bootstrap();
