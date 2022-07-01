import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { BasicStrategy as Strategy } from 'passport-http';
import { LoginUserUseCase } from 'src/core/login/login-user.usecase';

@Injectable()
export class BasicStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly _loginUseCase: LoginUserUseCase) {
    super();
  }

  async validate(login: string, password: string): Promise<any> {
    const result = await this._loginUseCase.execute({
      login,
      password
    });

    if (!result.user) throw new UnauthorizedException();
    return result;
  }
}
