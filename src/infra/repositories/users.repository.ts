import { PrismaStrategy } from '../strategies/prisma/prisma.strategy';
import { User, Prisma } from '@prisma/client';

export class UsersRepository {
  constructor(private prisma: PrismaStrategy) {
    this.prisma = new PrismaStrategy();
  }

  async user(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput
  ): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput
    });
  }

  async createUser(user: Prisma.UserCreateInput) {
    const result = await this.prisma.user.create({
      data: user
    });
    return result;
  }
}
