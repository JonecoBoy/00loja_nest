import { Injectable, NotFoundException } from '@nestjs/common';
import { Order, Prisma } from '@prisma/client';
import { OrdersRepository } from 'src/infra/repositories/orders.repository';
import { CreateOrderDto } from 'src/presentation/http/orders/create-order.dto';
import { OrderListDtoResponseItemType } from 'src/presentation/http/orders/list-orders.dto';
import { UpdateOrderDto } from 'src/presentation/http/orders/update-order.dto';

@Injectable()
export class OrdersService {
  constructor(private ordersRepository: OrdersRepository) {}
  findAll(): Promise<Array<Order> | Array<OrderListDtoResponseItemType>> {
    const result = this.ordersRepository.findAll();
    return result;
  }

  async findOne(id: string): Promise<Order | OrderListDtoResponseItemType> {
    const productCategory = await this.ordersRepository.findOne(id);
    if (!productCategory) {
      throw new NotFoundException();
    }
    return productCategory;
  }

  async softDelete(id: string): Promise<Order> {
    const productCategory = await this.ordersRepository.softDelete(id);
    if (!productCategory) {
      throw new NotFoundException();
    }
    return productCategory;
  }

  async create(
    input: CreateOrderDto.Request
  ): Promise<Order | CreateOrderDto.Response> {
    return await this.ordersRepository.create(input);
  }

  async updateByUnique(
    id: UpdateOrderDto.RequestParam,
    data: UpdateOrderDto.RequestBody
  ): Promise<(Prisma.OrderUpdateInput & UpdateOrderDto.Response) | null> {
    return await this.ordersRepository.updateByUnique(id, data);
  }
}
