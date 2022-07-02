import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { PassportModule } from '@nestjs/passport';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from './core/core.module';
import { JwtAuthGuard } from './presentation/auth/guards/jwt.guard';
import { RolesGuard } from './presentation/auth/guards/roles.guard';
import { PresentationModule } from './presentation/presentation.module';

@Module({
  imports: [CoreModule, PresentationModule, PassportModule],
  controllers: [AppController],
  providers: [AppService, RolesGuard]
})
export class AppModule {}
