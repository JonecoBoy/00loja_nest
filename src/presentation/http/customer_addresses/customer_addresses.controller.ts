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
import { CreateCustomerAddressDto } from './create-customer_address.dto';
import {
  CustomerAddressListDto,
  CustomerAddressListDtoResponseItemType
} from './list-customer_address.dto';
import { FindCustomerAddressDto } from './find-customer_address.dto';
import { UpdateCustomerAddressDto } from './update-customer_address.dto';
import { DeleteCustomerAddressDto } from './delete-customer_address.dto';
import { CustomerAddressesService } from 'src/core/customer_addresses/services/customer_address.service';
import { CustomerAddress } from '.prisma/client';
import { ListAllCustomerAddressesAdapter } from './adapters/list-all-customer_addresses.adapter';
import { FindCustomerAddressAdapter } from './adapters/find-customer_address.adapter';

@ApiTags('customer_addresses')
@Controller('customer_addresses')
export class CustomerAddressesController {
  constructor(
    private readonly customerAddressesService: CustomerAddressesService,
    private readonly listAllCustomerAddressesAdapter: ListAllCustomerAddressesAdapter,
    private readonly findCustomerAdressAdapter: FindCustomerAddressAdapter
  ) {}

  @ApiResponse({
    status: 201,
    type: CreateCustomerAddressDto.Response,
    isArray: false,
    description: 'Customer address succesfully created'
  })
  @ApiResponse({
    status: 401,
    type: ResultErrorDto,
    isArray: false,
    description: 'Customer address user not created'
  })
  @ApiBearerAuth()
  @Get()
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async findAll(): Promise<CustomerAddressListDto.Response> {
    const modelResponse = await this.customerAddressesService.findAll();
    const dtoResponse =
      this.listAllCustomerAddressesAdapter.modelToResponse(modelResponse);
    return dtoResponse;
  }

  @ApiResponse({
    status: 201,
    type: CreateCustomerAddressDto.Response,
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
  async findOne(
    @Param() params: any
  ): Promise<FindCustomerAddressDto.Response> {
    const { id } = params;
    return await this.customerAddressesService.findOne(id);
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
    @Body() body: CreateCustomerAddressDto.Request
  ): Promise<CreateCustomerAddressDto.Response | CustomerAddress> {
    const result = await this.customerAddressesService.create(body);
    // const dtoResponse =
    //   this.createCustomerAdapter.modelToResponse(modelResponse);
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
    @Param() id: UpdateCustomerAddressDto.RequestParam,
    @Body() body: UpdateCustomerAddressDto.RequestBody
  ): Promise<UpdateCustomerAddressDto.Response> {
    const modelResponse = await this.customerAddressesService.updateByUnique(
      id,
      body
    );
    // const dtoResponse =
    //   this.updateCustomerAdapter.modelToResponse(modelResponse);
    return modelResponse;
  }

  @ApiResponse({
    status: 201,
    type: DeleteCustomerAddressDto.Response,
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
  async delete(
    @Param() params: any
  ): Promise<DeleteCustomerAddressDto.Response> {
    const { id } = params;
    return await this.customerAddressesService.softDelete(id);
  }
}
