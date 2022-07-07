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
import { CreateOrderDto } from './create-order.dto';
import { OrderListDto } from './list-orders.dto';
import { FindOrderDto } from './find-order.dto';
import { UpdateOrderDto } from './update-order.dto';
import { Order } from '.prisma/client';
import { OrdersService } from 'src/core/orders/services/orders.service';
import { DeleteOrderDto } from './delete-order.dto';
import { ListAllOrdersAdapter } from './adapters/list-all-orders.adapter';
import { UpdateOrderAdapter } from './adapters/update-order.adapter';
import { FindOrderAdapter } from './adapters/find-order.adapter';
import { DeleteOrderAdapter } from './adapters/delete-order.adapter';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(
    private readonly ordersService: OrdersService,
    private readonly listAllOrdersAdapter: ListAllOrdersAdapter,
    private readonly updateOrderAdapter: UpdateOrderAdapter,
    private readonly findOrderAdapter: FindOrderAdapter,
    private readonly deleteOrderAdapter: DeleteOrderAdapter
  ) {}

  @ApiResponse({
    status: 201,
    type: CreateOrderDto.Response,
    isArray: true,
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
  async findAll(): Promise<OrderListDto.Response> {
    const modelResponse = await this.ordersService.findAll();
    const dtoResponse =
      this.listAllOrdersAdapter.modelToResponse(modelResponse);
    return dtoResponse;
  }

  @ApiResponse({
    status: 201,
    type: CreateOrderDto.Request,
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
  async findOne(@Param() params: any): Promise<FindOrderDto.Response> {
    const { id } = params;
    const modelResponse = await this.ordersService.findOne(id);
    const dtoResponse = this.findOrderAdapter.modelToResponse(modelResponse);
    return dtoResponse;
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
  @Roles(Role.ADMIN, Role.USER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async create(
    @Body() body: CreateOrderDto.Request
  ): Promise<CreateOrderDto.Response | Order> {
    const result = await this.ordersService.create(body);
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
  async update(
    @Param() id: UpdateOrderDto.RequestParam,
    @Body() body: UpdateOrderDto.RequestBody
  ): Promise<UpdateOrderDto.Response> {
    const modelResponse = await this.ordersService.updateByUnique(id, body);
    // const dtoResponse = this.updateOrderAdapter.modelToResponse(modelResponse);
    return modelResponse;
  }

  @ApiResponse({
    status: 201,
    type: DeleteOrderDto.Response,
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
  async delete(@Param() params: any): Promise<DeleteOrderDto.Response> {
    const { id } = params;
    const modelResponse = await this.ordersService.softDelete(id);
    const dtoResponse = this.findOrderAdapter.modelToResponse(modelResponse);
    return dtoResponse;
  }
}
