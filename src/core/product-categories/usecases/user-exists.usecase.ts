import { Injectable } from '@nestjs/common';
import { UsersRepository } from 'src/infra/repositories/users.repository';
@Injectable()
export class GetUserId {
  constructor(private usersRepository: UsersRepository) {}
  async findAll() {
    return await this.usersRepository.findAll();
  }
}
