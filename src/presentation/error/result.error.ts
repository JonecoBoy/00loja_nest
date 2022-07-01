import { HttpException } from '@nestjs/common';

export class ResultError extends HttpException {
  constructor(message: string, status: number) {
    super(message, status);
  }

  static build(message: string, status: number) {
    return new ResultError(message, status);
  }
}
