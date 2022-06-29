import { Module } from '@nestjs/common';
import { RepositoriesModule } from 'src/infra/repositories/repositories.module';
import { PrismaStrategy } from 'src/infra/strategies/prisma/prisma.strategy';

import { UsersService } from './users/services/users.service';

@Module({
  imports: [RepositoriesModule],
  controllers: [],
  providers: [UsersService, PrismaStrategy],
  exports: [UsersService]
})
export class CoreModule {}
