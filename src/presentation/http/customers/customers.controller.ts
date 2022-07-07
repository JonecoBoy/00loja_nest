import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Put
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guards/jwt.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { ResultErrorDto } from '../../error/error.dto';
import { CreateUserDto } from '../users/create-user.dto';
import { Roles } from '../../auth/roles/role.decorator';
import { Role } from '../../auth/roles/role.enum';
import { CustomersService } from '../../../core/customers/services/customers.service';
import { CreateCustomerDto } from './create-customer.dto';
import { DeleteCustomerDto } from './delete-customer.dto';
import { UpdateCustomerDto } from './update-customer.dto';
import { FindCustomerDto } from './find-customer.dto';
import { CustomerListDto } from './list-customer.dto';
import { Customer } from 'src/core/customers/customer';
import { ListAllCustomersAdapter } from './adapters/list-all-customers.adapter';
import { FindCustomerAdapter } from './adapters/find-product.adapter';

@ApiTags('customers')
@Controller('customers')
export class CustomersController {
  constructor(
    private readonly customersService: CustomersService,
    private readonly listAllCustomersAdapter: ListAllCustomersAdapter,
    private readonly findCustomerAdapter: FindCustomerAdapter
  ) {}

  @ApiResponse({
    status: 201,
    type: CreateCustomerDto.Response,
    isArray: true,
    description: 'Product succesfully created'
  })
  @ApiResponse({
    status: 401,
    type: ResultErrorDto,
    isArray: false,
    description: 'Product user not created'
  })
  @ApiBearerAuth()
  @Get()
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async findAll(): Promise<CustomerListDto.Response> {
    const modelResponse = await this.customersService.findAll();
    const dtoResponse =
      this.listAllCustomersAdapter.modelToResponse(modelResponse);
    return dtoResponse;
  }

  @ApiResponse({
    status: 201,
    type: CreateCustomerDto.Request,
    isArray: false,
    description: 'Product succesfully finded'
  })
  @ApiResponse({
    status: 401,
    type: ResultErrorDto,
    isArray: false,
    description: 'Error Product not finded'
  })
  @ApiBearerAuth()
  @Get(':id')
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async findOne(@Param() params: any): Promise<FindCustomerDto.Response> {
    const { id } = params;
    return await this.customersService.findOne(id);
  }

  @ApiResponse({
    status: 201,
    type: CreateUserDto.Response,
    isArray: false,
    description: 'Product succesfully created'
  })
  @ApiResponse({
    status: 401,
    type: ResultErrorDto,
    isArray: false,
    description: 'Error Product not created'
  })
  @Post()
  @Roles(Role.USER, Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async create(
    @Body() body: CreateCustomerDto.Request
  ): Promise<CreateCustomerDto.Response | Customer> {
    const result = await this.customersService.create(body);

    return result;
  }

  @ApiResponse({
    status: 201,
    // type: UpdateUserDto.Response,
    isArray: false,
    description: 'Product succesfully edited'
  })
  @ApiResponse({
    status: 401,
    // type: ResultErrorDto,
    isArray: false,
    description: 'Error Product not edited'
  })
  @ApiBearerAuth()
  @Put(':id')
  @Roles(Role.ADMIN, Role.USER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async update(
    @Param() id: UpdateCustomerDto.RequestParam,
    @Body() body: UpdateCustomerDto.RequestBody
  ): Promise<UpdateCustomerDto.Response> {
    const modelResponse = await this.customersService.updateByUnique(id, body);
    // const dtoResponse =
    //   this.updateCustomerAdapter.modelToResponse(modelResponse);
    return modelResponse;
  }

  @ApiResponse({
    status: 201,
    type: DeleteCustomerDto.Response,
    isArray: false,
    description: 'Product succesfully deleted'
  })
  @ApiResponse({
    status: 401,
    type: ResultErrorDto,
    isArray: false,
    description: 'Error Product not deleted'
  })
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  @Delete(':id')
  async delete(@Param() params: any): Promise<DeleteCustomerDto.Response> {
    const { id } = params;
    return await this.customersService.softDelete(id);
  }
}
