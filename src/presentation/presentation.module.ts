import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { CoreModule } from 'src/core/core.module';
import { UsersService } from 'src/core/users/services/users.service';
import { RepositoriesModule } from 'src/infra/repositories/repositories.module';
import { UsersRepository } from 'src/infra/repositories/users.repository';
import { PrismaStrategy } from 'src/infra/strategies/prisma/prisma.strategy';
import { RolesGuard } from './auth/guards/roles.guard';
import { BasicStrategy } from './auth/strategies/basic.strategy';
import { JwtStrategy } from './auth/strategies/jwt.strategy';
import { AuthController } from './http/auth/auth.controller';
import { DeleteUserAdapter } from './http/users/adapters/delete-user.adapter';
import { GetUserAdapter } from './http/users/adapters/get-user.adapter';
import { ListAllUsersAdapter } from './http/users/adapters/list-all-users.adapter';
import { UpdateUserAdapter } from './http/users/adapters/update-user.adapter';
import { UsersController } from './http/users/users.controller';

@Module({
  imports: [RepositoriesModule, CoreModule, PassportModule],
  controllers: [UsersController, AuthController],
  providers: [
    UsersService,
    PrismaStrategy,
    BasicStrategy,
    JwtStrategy,
    RolesGuard,
    UsersRepository,
    ListAllUsersAdapter,
    GetUserAdapter,
    DeleteUserAdapter,
    UpdateUserAdapter
  ]
})
export class PresentationModule {}
