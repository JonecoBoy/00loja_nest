import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { RepositoriesModule } from 'src/infra/repositories/repositories.module';
import { UsersRepository } from 'src/infra/repositories/users.repository';
import { PrismaStrategy } from 'src/infra/strategies/prisma/prisma.strategy';
import { GenerateJwtUseCase } from './auth/generate-jwt.usecase';
import { LoginUserUseCase } from './login/login-user.usecase';
import { ValidateUserUseCase } from './login/validate-user.usecase';

import { UsersService } from './users/services/users.service';

// futuro tirar daqui e por na infra e puxar por um servico no core. ai a presentatiopn pega dele
@Module({
  imports: [
    RepositoriesModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' }
    })
  ],
  controllers: [],
  providers: [
    UsersService,
    PrismaStrategy,
    GenerateJwtUseCase,
    LoginUserUseCase,
    ValidateUserUseCase,
    UsersRepository
  ],
  exports: [
    UsersService,
    GenerateJwtUseCase,
    LoginUserUseCase,
    ValidateUserUseCase,
    UsersRepository
  ]
})
export class CoreModule {}
