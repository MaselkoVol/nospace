import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { BaseException } from '../exceptions/base.exception';
import { Request, Response } from 'express';
import { InternalServerErrorException } from '../exceptions/internal-server-error.exception';

function getBaseException(exception: unknown) {
  if (exception instanceof BaseException) {
    return exception;
  }
  if (exception instanceof Error) {
    return new InternalServerErrorException(exception);
  }
  return new InternalServerErrorException();
}

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    const baseException = getBaseException(exception);

    console.log(baseException.message);

    return response.status(baseException.statusCode).json({
      code: baseException.errorCode,
      message: baseException.message,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
