import { HttpException } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class ResultErrorDto {
  @ApiProperty()
  statusCode: number;

  @ApiProperty()
  message: string;
}
