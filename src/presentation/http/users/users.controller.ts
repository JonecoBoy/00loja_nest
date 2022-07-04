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
import {
  ApiBasicAuth,
  ApiBearerAuth,
  ApiResponse,
  ApiTags
} from '@nestjs/swagger';
import { UsersService } from 'src/core/users/services/users.service';
import { JwtAuthGuard } from 'src/presentation/auth/guards/jwt.guard';
import { RolesGuard } from 'src/presentation/auth/guards/roles.guard';
import { Roles } from 'src/presentation/auth/roles/role.decorator';
import { Role } from 'src/presentation/auth/roles/role.enum';
import { ResultErrorDto } from 'src/presentation/error/error.dto';
import { ListAllUsersAdapter } from './adapters/list-all-users.adapter';
import { CreateUserDto } from './create-user.dto';
import { UserListDto } from './list-user.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly listAllUsersAdapter: ListAllUsersAdapter
  ) {}

  @ApiBearerAuth()
  @Get()
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async findAll(@Request() req: Request): Promise<UserListDto.Response> {
    const modelResponse = await this.usersService.findAll();
    const dtoResponse = this.listAllUsersAdapter.modelToResponse(modelResponse);
    return dtoResponse;
  }

  @ApiResponse({
    status: 201,
    type: CreateUserDto.Request,
    isArray: false,
    description: 'User succesfully created'
  })
  @ApiResponse({
    status: 401,
    type: ResultErrorDto,
    isArray: false,
    description: 'Error user not created'
  })
  @Post()
  async createUser(
    @Body() body: CreateUserDto.Request
  ): Promise<CreateUserDto.Response> {
    return null;
  }
}
