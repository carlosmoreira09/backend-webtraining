import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  logger = new Logger('Response');

  constructor() {
  }

  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl: url } = req;
    const reqTime = new Date().getTime();

    res.on('finish', () => {
      const { statusCode } = res;
      const restTime = new Date().getTime();
      if (statusCode === 201) {
        this.logger.log(
          `${method} ${url} ${statusCode} - ${restTime - reqTime}`,
        );
      } else if (statusCode === 200) {
        this.logger.log(
          `${method} ${url} ${statusCode} - ${restTime - reqTime}`,
        );
      } else {
        this.logger.log(
          `${method} ${url} ${statusCode} - ${restTime - reqTime}`,
        );
      }
    });
    next();
  }
}
