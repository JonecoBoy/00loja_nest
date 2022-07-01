import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete
} from '@nestjs/common';
import { UsersService } from 'src/core/users/services/users.service';
import { CreateUserDto } from './create-user.dto';
import { UserListDto } from './list-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @Get('abcv')
  // async testeeee(@Body('source') entrada: any, @Body('target') campo: any) {
  //   return await this.usersService.updateByUnique(entrada, campo);
  // }

  // @Post()
  // async create(@Body() createUserDto: CreateUserDto) {
  //   return await this.usersService.create(createUserDto);
  // }
  //: Promise<UserListDto.Response>
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  // @Get(':id')
  // async findOne(@Param('id') id: string) {
  //   return await this.usersService.findOne(id);
  // }

  // // @Patch(':id')
  // // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  // //   return this.usersService.update(+id, updateUserDto);
  // // }

  // @Delete(':id')
  // async remove(@Param('id') id: string) {
  //   return await this.usersService.delete(id);
  // }
}
