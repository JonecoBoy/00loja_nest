import { Module } from '@nestjs/common';
import { UsersService } from 'src/core/users/services/users.service';
import { RepositoriesModule } from 'src/infra/repositories/repositories.module';
import { PrismaStrategy } from 'src/infra/strategies/prisma/prisma.strategy';
import { UsersController } from './users/controllers/users.controller';

@Module({
  imports: [RepositoriesModule],
  controllers: [UsersController],
  providers: [UsersService, PrismaStrategy]
})
export class PresentationModule {}
