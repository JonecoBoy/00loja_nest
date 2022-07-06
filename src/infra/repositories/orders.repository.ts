import { PrismaStrategy } from '../strategies/prisma/prisma.strategy';
import { Order, Prisma } from '@prisma/client';

import { HttpException, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from 'src/presentation/http/orders/create-order.dto';
export class OrdersRepository {
  constructor(private prisma: PrismaStrategy) {
    this.prisma = new PrismaStrategy();
  }

  async findAll() {
    return this.prisma.order.findMany({
      include: {
        products: true,
        customer_address: true,
        customer: true
      }
    });
  }

  async findByUnique(userWhereUniqueInput: Prisma.ProductWhereUniqueInput) {
    return null;
  }
  async findMany(user: Prisma.ProductCreateInput) {
    return await this.prisma.order;
  }

  async findOne(id: string) {
    return await this.prisma.order.findFirst({
      where: {
        AND: [{ id }, { deleted_at: null }]
      },
      include: {
        products: true,
        customer_address: true,
        customer: true
      }
    });
  }

  async exists(id: string) {
    return await this.prisma.order.findFirst({
      where: {
        AND: [{ id }, { deleted_at: null }]
      }
    });
  }

  async updateByUnique(
    { id },
    input: Prisma.OrderUpdateInput | any
  ): Promise<any | null> {
    if (!this.exists(id)) {
      throw new NotFoundException();
    }
    const { products, ...rest } = input;
    console.log(products);
    const result = await this.prisma.order.update({
      where: { id },
      data: {
        ...rest,
        products: {
          set: products
        }
      },
      include: {
        products: true,
        customer_address: true,
        customer: true
      }
    });
    return result;
  }

  async create(
    input: Prisma.OrderUncheckedCreateInput & CreateOrderDto.Request
  ): Promise<CreateOrderDto.Response | Order | null> {
    const { products, ...rest } = input;
    const order = await this.prisma.order.create({
      data: {
        ...rest,
        products: {
          connect: [...products]
        }
      },
      include: {
        products: true,
        customer_address: true,
        customer: true
      }
    });
    return order;
  }

  async softDelete(id: string): Promise<Order | null> {
    const now = new Date(Date.now());
    const userNotDeleted = await this.prisma.order.findFirst({
      where: {
        AND: [{ id }, { deleted_at: null }]
      }
    });
    if (!userNotDeleted) {
      return null;
    }
    // o correto seria eu colocar um _old no final do email
    return await this.prisma.order.update({
      where: {
        id
      },
      data: {
        deleted_at: now
      }
    });
  }
}
