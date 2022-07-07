import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Request,
  Put
} from '@nestjs/common';
import {
  ApiBasicAuth,
  ApiBearerAuth,
  ApiResponse,
  ApiTags
} from '@nestjs/swagger';
import { UsersService } from 'src/core/users/services/users.service';
import { JwtAuthGuard } from '../../auth/guards/jwt.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/roles/role.decorator';
import { Role } from '../../auth/roles/role.enum';
import { ResultErrorDto } from '../../error/error.dto';
import { DeleteUserAdapter } from './adapters/delete-user.adapter';
import { GetUserAdapter } from './adapters/get-user.adapter';
import { ListAllUsersAdapter } from './adapters/list-all-users.adapter';
import { UpdateUserAdapter } from './adapters/update-user.adapter';
import { CreateUserDto } from './create-user.dto';
import { DeleteUserDto } from './delete-user.dto';
import { FindUserDto } from './find-user.dto';
import { UserListDto } from './list-user.dto';
import { UpdateUserDto } from './update-user.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly listAllUsersAdapter: ListAllUsersAdapter,
    private readonly getUserAdapter: GetUserAdapter,
    private readonly deleteUserAdapter: DeleteUserAdapter,
    private readonly updateUserAdapter: UpdateUserAdapter
  ) {}

  @ApiResponse({
    status: 201,
    isArray: true,
    description: 'User succesfully created'
  })
  @ApiResponse({
    status: 401,
    type: ResultErrorDto,
    isArray: false,
    description: 'Error user not created'
  })
  @ApiBearerAuth()
  @Get()
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async findAll(@Request() req: Request): Promise<UserListDto.Response> {
    const modelResponse = await this.usersService.findAll();
    const dtoResponse = this.listAllUsersAdapter.modelToResponse(modelResponse);
    return dtoResponse;
  }

  @ApiResponse({
    status: 200,
    type: FindUserDto.Response,
    isArray: false,
    description: 'User succesfully finded'
  })
  @ApiResponse({
    status: 401,
    type: ResultErrorDto,
    isArray: false,
    description: 'Error user not finded'
  })
  @ApiBearerAuth()
  @Get(':id')
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async findOne(
    @Param() params: FindUserDto.Request
  ): Promise<FindUserDto.Response> {
    const { id } = params;
    const modelResponse = await this.usersService.findOne(id);
    const dtoResponse = this.getUserAdapter.modelToResponse(modelResponse);
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
    const modelResponse = await this.usersService.createUser(body);
    const dtoResponse = this.getUserAdapter.modelToResponse(modelResponse);
    return dtoResponse;
  }

  @ApiResponse({
    status: 200,
    type: UpdateUserDto.Response,
    isArray: false,
    description: 'User succesfully edited'
  })
  @ApiResponse({
    status: 401,
    type: ResultErrorDto,
    isArray: false,
    description: 'Error user not edited'
  })
  @ApiBearerAuth()
  @Put(':id')
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async UpdateUserDto(
    @Param() id: UpdateUserDto.RequestParam,
    @Body() body: UpdateUserDto.RequestBody
  ): Promise<UpdateUserDto.Response> {
    const modelResponse = await this.usersService.updateByUnique(id, body);
    const dtoResponse = this.updateUserAdapter.modelToResponse(modelResponse);
    return dtoResponse;
  }

  @ApiResponse({
    status: 200,
    isArray: false,
    description: 'User succesfully deleted'
  })
  @ApiResponse({
    status: 401,
    type: ResultErrorDto,
    isArray: false,
    description: 'Error user not deleted'
  })
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  @Delete(':id')
  async deleteUser(
    @Param() params: DeleteUserDto.Request
  ): Promise<DeleteUserDto.Response> {
    const { id } = params;
    const modelResponse = await this.usersService.softDelete(id);
    const dtoResponse = this.deleteUserAdapter.modelToResponse(modelResponse);
    return dtoResponse;
  }
}
