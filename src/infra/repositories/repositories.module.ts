import { Global, Module } from '@nestjs/common';
import { PrismaStrategy } from '../strategies/prisma/prisma.strategy';
import { ProductCategoriesRepository } from './product-categories.repository';
import { UsersRepository } from './users.repository';
@Global()
@Module({
  controllers: [],
  providers: [UsersRepository, PrismaStrategy, ProductCategoriesRepository],
  exports: [UsersRepository, PrismaStrategy, ProductCategoriesRepository]
})
export class RepositoriesModule {}
