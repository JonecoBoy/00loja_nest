import { Injectable } from '@nestjs/common';
import { UsersRepository } from 'src/infra/repositories/users.repository';
import { IBaseUseCase } from '../base.usecase';
import { LoginUserDto } from './login-user.dto';

@Injectable()
export class LoginUserUseCase
  implements IBaseUseCase<LoginUserDto.Input, Promise<LoginUserDto.Output>>
{
  constructor(private readonly _usersRepository: UsersRepository) {}

  async execute(input: LoginUserDto.Input): Promise<LoginUserDto.Output> {
    // cuidado para nao enviar o password, entao usar destructure e só por o que quiser
    const { email, first_name, last_name, role, ...rest } =
      await this._usersRepository.checkLogin(input.login, input.password);
    const user = {
      email,
      first_name,
      last_name,
      role
    };
    return {
      user
    };
  }
}
