import { Injectable } from '@nestjs/common';
import { IBaseUseCase } from '../base.usecase';
import { LoginUserDto } from './login-user.dto';

@Injectable()
export class LoginUserUseCase
  implements IBaseUseCase<LoginUserDto.Input, Promise<LoginUserDto.Output>>
{
  //   constructor(
  //     private readonly _userRepository: UserRepository
  //   ) {}

  async execute(input: LoginUserDto.Input): Promise<LoginUserDto.Output> {
    let result;

    if (input.login === 'joneco@hotmail.com' && input.password === 'flamengo')
      result = {
        email: input.login,
        name: 'jonas',
        type: 'user'
      };

    return {
      user: result
    };
  }
}
