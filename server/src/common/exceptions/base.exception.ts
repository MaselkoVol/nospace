export abstract class BaseException extends Error {
  constructor(
    message: string,
    readonly statusCode: number,
    readonly errorCode: string,
    cause?: Error,
  ) {
    super(message, { cause });
  }
}
