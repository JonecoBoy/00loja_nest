import { Injectable } from '@nestjs/common';
import { UsersRepository } from 'src/infra/repositories/users.repository';
import { Prisma } from '@prisma/client';
@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}
  findAll() {
    const result = this.usersRepository.findAll();
    return result;
  }

  // async findOne(id: string) {
  //   return await this.usersRepository.findOne(id);
  // }

  // async update() {
  //   return true;
  // }
  // //softdelete
  // async delete(id: string) {
  //   return await this.usersRepository.delete(id);
  // }

  // async remove() {
  //   return true;
  // }

  // async create(user) {
  //   return await this.usersRepository.createUser(user);
  // }

  // async updateByUnique(source, target) {
  //   return await this.usersRepository.updateByUnique(source, target);
  // }
}
