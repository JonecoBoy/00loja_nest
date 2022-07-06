import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersRepository } from 'src/infra/repositories/users.repository';
import { IBaseUseCase } from '../base.usecase';
import * as bcrypt from 'bcrypt';

@Injectable()
export class VerifyHashedPassUseCase {
  async execute(input: string, hashedPass: string): Promise<boolean> {
    return await bcrypt.compare(input, hashedPass);
  }
}
