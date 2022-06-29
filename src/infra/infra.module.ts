import { Module } from '@nestjs/common';
import { RepositoriesModule } from './repositories/repositories.module';
import { PrismaStrategy } from './strategies/prisma/prisma.strategy';

@Module({
  imports: [RepositoriesModule],
  controllers: [],
  providers: [PrismaStrategy],
  exports: []
})
export class InfraModule {}
