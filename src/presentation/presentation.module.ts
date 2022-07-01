import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { CoreModule } from 'src/core/core.module';
import { UsersService } from 'src/core/users/services/users.service';
import { RepositoriesModule } from 'src/infra/repositories/repositories.module';
import { PrismaStrategy } from 'src/infra/strategies/prisma/prisma.strategy';
import { BasicStrategy } from './auth/strategies/basic.strategy';
import { JwtStrategy } from './auth/strategies/jwt.strategy';
import { AuthController } from './http/auth/auth.controller';
import { UsersController } from './http/users/users.controller';

@Module({
  imports: [RepositoriesModule, CoreModule, PassportModule],
  controllers: [UsersController, AuthController],
  providers: [UsersService, PrismaStrategy, BasicStrategy, JwtStrategy]
})
export class PresentationModule {}
