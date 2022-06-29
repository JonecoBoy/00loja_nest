import { Injectable } from '@nestjs/common';
import { UsersRepository } from 'src/infra/repositories/users.repository';
import { Role } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}
  async createUser() {
    const user = {
      first_name: 'Jonas',
      last_name: 'Nunes',
      email: 'joneco@hotmail.com',
      role: Role.ADMIN
    };
    const result = await this.usersRepository.createUser(user);
    return result;
  }
}
