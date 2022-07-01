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
      sub: input.user.login,
      name: input.user.name,
      type: input.user.type,
      aditionalData: input.aditionalData
    };

    return {
      token: this._jwtService.sign(payload)
    };
  }
}
