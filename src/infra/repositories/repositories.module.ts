import { Global, Module } from '@nestjs/common';
import { PrismaStrategy } from '../strategies/prisma/prisma.strategy';
import { UsersRepository } from './users.repository';
@Global()
@Module({
  controllers: [],
  providers: [UsersRepository, PrismaStrategy],
  exports: [UsersRepository, PrismaStrategy]
})
export class RepositoriesModule {}
