import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { RepositoriesModule } from 'src/infra/repositories/repositories.module';
import { PrismaStrategy } from 'src/infra/strategies/prisma/prisma.strategy';
import { GenerateJwtUseCase } from './auth/generate-jwt.usecase';
import { LoginUserUseCase } from './login/login-user.usecase';

import { UsersService } from './users/services/users.service';

@Module({
  imports: [
    RepositoriesModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60s' }
    })
  ],
  controllers: [],
  providers: [
    UsersService,
    PrismaStrategy,
    GenerateJwtUseCase,
    LoginUserUseCase
  ],
  exports: [UsersService, GenerateJwtUseCase, LoginUserUseCase]
})
export class CoreModule {}
