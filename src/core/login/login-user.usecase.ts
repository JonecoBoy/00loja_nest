import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersRepository } from 'src/infra/repositories/users.repository';
import { IBaseUseCase } from '../base.usecase';
import { LoginUserDto } from './login-user.dto';
import { VerifyHashedPassUseCase } from './verify-hashed-pass.usecase';

@Injectable()
export class LoginUserUseCase
  implements IBaseUseCase<LoginUserDto.Input, Promise<LoginUserDto.Output>>
{
  constructor(
    private readonly _usersRepository: UsersRepository,
    private readonly _verifyHashedPassUsecase: VerifyHashedPassUseCase
  ) {}

  async execute(input: LoginUserDto.Input): Promise<LoginUserDto.Output> {
    // cuidado para nao enviar o password, entao usar destructure e só por o que quiser
    try {
      const {
        email,
        first_name,
        last_name,
        roles,
        password: hashedPassword,
        ...rest
      } = await this._usersRepository.findOneByEmail(input.login);

      const verifyPass = await this._verifyHashedPassUsecase.execute(
        input.password,
        hashedPassword
      );
      if (!verifyPass) {
        throw new UnauthorizedException();
      }
      const user = {
        email,
        first_name,
        last_name,
        roles
      };
      return {
        user
      };
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}
