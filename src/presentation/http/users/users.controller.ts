import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  SetMetadata,
  Request
} from '@nestjs/common';
import { UsersService } from 'src/core/users/services/users.service';
import { JwtAuthGuard } from 'src/presentation/auth/guards/jwt.guard';
import { RolesGuard } from 'src/presentation/auth/guards/roles.guard';
import { Roles } from 'src/presentation/auth/roles/role.decorator';
import { Role } from 'src/presentation/auth/roles/role.enum';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Roles(Role.User)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async findAll(@Request() req: any) {
    return this.usersService.findAll();
  }
}
