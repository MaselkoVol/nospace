import { HttpStatus } from '@nestjs/common';
import { BaseException } from './base.exception';

export class InternalServerErrorException extends BaseException {
  constructor(cause?: Error) {
    super(
      'Internal server error',
      HttpStatus.INTERNAL_SERVER_ERROR,
      'INTERNAL_SERVER_ERROR',
      cause,
    );
  }
}
