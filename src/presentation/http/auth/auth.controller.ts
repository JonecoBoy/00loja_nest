import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBasicAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GenerateJwtUseCase } from 'src/core/auth/generate-jwt.usecase';
import { BasicAuthGuard } from 'src/presentation/auth/guards/basic.guard';
import { ResultErrorDto } from '../../error/error.dto';
import { LoginDto, LoginDtoResponse } from './auth.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly _generateJwtUseCase: GenerateJwtUseCase) {}

  // @ApiBasicAuth()
  // @ApiResponse({
  //   status: 201,
  //   type: LoginDtoResponse,
  //   isArray: false,
  //   description: 'Returns token'
  // })
  // @ApiResponse({
  //   status: 401,
  //   type: ResultErrorDto,
  //   isArray: false,
  //   description: 'Returns token'
  // })
  @ApiBasicAuth()
  @Post()
  @UseGuards(BasicAuthGuard)
  async login(@Request() req): Promise<LoginDtoResponse | ResultErrorDto> {
    return this._generateJwtUseCase.execute(req.user);
  }
}
