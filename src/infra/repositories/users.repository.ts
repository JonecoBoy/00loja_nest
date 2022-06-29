import { PrismaStrategy } from '../strategies/prisma/prisma.strategy';
import { User, Prisma } from '@prisma/client';

export class UsersRepository {
  constructor(private prisma: PrismaStrategy) {
    this.prisma = new PrismaStrategy();
  }

  async findAll() {
    return await this.prisma.user.findMany();
  }

  async findByUnique(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput
  ): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput
    });
  }

  async findMany(user: Prisma.UserCreateInput) {
    return await this.prisma.user;
  }

  async findOne(id: string) {
    return await this.prisma.user.findUnique({
      where: {
        id
      }
    });
  }

  async update(user: Prisma.UserUpdateInput) {
    return true;
  }

  async updateByUnique(id, data: Prisma.UserUpdateInput) {
    console.log(id);
    console.log(data);
    return true;
    // return await this.prisma.user.update({
    //   where: {
    //     id
    //   },
    //   data
    // });
  }

  //softdelete
  async delete(id: string): Promise<User | null> {
    const now = new Date(Date.now());
    return await this.prisma.user.update({
      where: {
        id
      },
      data: {
        deletedAt: now
      }
    });
  }

  async remove() {
    return true;
  }

  async createUser(user: Prisma.UserCreateInput): Promise<User | null> {
    const result = await this.prisma.user.create({
      data: user
    });
    return result;
  }
}
