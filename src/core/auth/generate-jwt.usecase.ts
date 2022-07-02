import { Injectable } from '@nestjs/common';
import { IBaseUseCase } from '../base.usecase';
import { GenerateJwtDto } from './generate-jwt.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class GenerateJwtUseCase
  implements IBaseUseCase<GenerateJwtDto.Input, Promise<GenerateJwtDto.Output>>
{
  constructor(private readonly _jwtService: JwtService) {}

  async execute(input: GenerateJwtDto.Input): Promise<GenerateJwtDto.Output> {
    const payload = {
      email: input.user.email,
      first_name: input.user.first_name,
      last_name: input.user.last_name,
      roles: input.user.roles,
      aditionalData: input.aditionalData
    };

    return {
      token: this._jwtService.sign(payload)
    };
  }
}
