import { PrismaStrategy } from '../strategies/prisma/prisma.strategy';
import { Prisma } from '@prisma/client';
import { User } from 'src/core/users/user';
import { CreateUserDto } from 'src/presentation/http/users/create-user.dto';
import { HttpException, NotFoundException } from '@nestjs/common';
import { Role } from 'src/presentation/auth/roles/role.enum';
export class UsersRepository {
  constructor(private prisma: PrismaStrategy) {
    this.prisma = new PrismaStrategy();
  }

  async findAll() {
    return this.prisma.user.findMany();
  }

  async findByUnique(userWhereUniqueInput: Prisma.UserWhereUniqueInput) {
    return null;
  }

  async checkLogin(email: string, password: string) {
    return await this.prisma.user.findFirst({
      where: {
        AND: [{ email }, { password }, { deleted_at: null }]
      }
    });
  }

  async checkUserDeleted(email: string) {
    return await this.prisma.user.findFirst({
      where: {
        AND: [{ email }, { deleted_at: null }]
      }
    });
  }

  async findMany(user: Prisma.UserCreateInput) {
    return await this.prisma.user;
  }

  async findOne(id: string) {
    return await this.prisma.user.findFirst({
      where: {
        AND: [{ id }, { deleted_at: null }]
      }
    });
  }
  async findOneByEmail(email) {
    const result = await this.prisma.user.findFirst({
      where: {
        AND: [{ email }, { deleted_at: null }]
      }
    });

    return result;
  }

  async update(user: Prisma.UserUpdateInput) {
    return true;
  }

  async updateByUnique({ id }, data: Prisma.UserUpdateInput) {
    return await this.prisma.user.update({
      where: {
        id
      },
      data
    });
  }

  async create(user: CreateUserDto.Request) {
    const userExists = await this.prisma.user.findUnique({
      where: { email: user.email }
    });
    if (userExists) {
      throw new HttpException('Email already registered', 400);
    } else {
      user.roles = [Role.USER];
      return await this.prisma.user.create({ data: user });
    }
  }

  async softDelete(id: string): Promise<User | null> {
    const now = new Date(Date.now());
    const userNotDeleted = await this.prisma.user.findFirst({
      where: {
        AND: [{ id }, { deleted_at: null }]
      }
    });
    if (!userNotDeleted) {
      return null;
    }
    // o correto seria eu colocar um _old no final do email
    return await this.prisma.user.update({
      where: {
        id
      },
      data: {
        deleted_at: now
      }
    });
  }
}
