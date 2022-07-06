import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from 'src/infra/repositories/users.repository';
import { Prisma } from '@prisma/client';
import { User } from '../user';
import { CreateUserDto } from 'src/presentation/http/users/create-user.dto';
import { UpdateUserDto } from 'src/presentation/http/users/update-user.dto';
import { HashPasswordUsecase } from '../usecases/hash-password.usecase';
@Injectable()
export class UsersService {
  constructor(
    private usersRepository: UsersRepository,
    private readonly hashPasswordUseCase: HashPasswordUsecase
  ) {}
  findAll(): Promise<Array<User>> {
    const result = this.usersRepository.findAll();
    return result;
  }

  async findOne(id: string): Promise<User> {
    const user = await this.usersRepository.findOne(id);
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  async softDelete(id: string): Promise<User> {
    const user = await this.usersRepository.softDelete(id);
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  async createUser(input: CreateUserDto.Request): Promise<User> {
    const { password, ...rest } = input;
    const hashedPasword = await this.hashPasswordUseCase.execute(password);
    const userHashedPass = { password: hashedPasword, ...rest };
    return await this.usersRepository.create(userHashedPass);
  }

  async updateUser(id: string): Promise<User> {
    const user = await this.usersRepository.softDelete(id);
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  async updateByUnique(
    id: UpdateUserDto.RequestParam,
    data: UpdateUserDto.RequestBody
  ) {
    return await this.usersRepository.updateByUnique(id, data);
  }

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
