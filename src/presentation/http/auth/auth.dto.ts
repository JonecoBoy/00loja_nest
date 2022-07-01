import { ApiProperty } from '@nestjs/swagger';
import { ResultError } from '../../error/result.error';

export class LoginDtoResponse {
  @ApiProperty({
    description: 'jwt token para acesso logado',
    example: 'fsdfsdfsdfsdfsdfsdfsfsdf'
  })
  token: string;
}

export namespace LoginDto {
  // export type Response = LoginDtoResponseType | ResultError
}
