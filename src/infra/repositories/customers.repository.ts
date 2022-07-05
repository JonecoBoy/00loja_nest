import { PrismaStrategy } from '../strategies/prisma/prisma.strategy';
import { Prisma } from '@prisma/client';

import { HttpException, NotFoundException } from '@nestjs/common';
import { Customer } from 'src/core/customers/customer';
import { CreateCustomerDto } from 'src/presentation/http/customers/create-customer.dto';
export class CustomersRepository {
  constructor(private prisma: PrismaStrategy) {
    this.prisma = new PrismaStrategy();
  }

  async findAll() {
    return this.prisma.customer.findMany({
      include: {
        customer_addresses: true
      }
    });
  }

  async findByUnique(userWhereUniqueInput: Prisma.ProductWhereUniqueInput) {
    return null;
  }
  async findMany(user: Prisma.ProductCreateInput) {
    return await this.prisma.customer;
  }

  async findOne(id: string) {
    return await this.prisma.customer.findFirst({
      where: {
        AND: [{ id }, { deleted_at: null }]
      },
      include: {
        customer_addresses: true
      }
    });
  }

  async exists(id: string) {
    return await this.prisma.customer.findFirst({
      where: {
        AND: [{ id }, { deleted_at: null }]
      },
      include: {
        customer_addresses: true
      }
    });
  }

  async updateByUnique(
    { id },
    data: Prisma.CustomerUpdateInput | any
  ): Promise<Customer | null> {
    const userExists = await this.findOne(id);
    if (userExists) {
      return await this.prisma.customer.update({
        where: {
          id
        },
        data
      });
    } else {
      throw new NotFoundException();
    }
  }

  async create(
    customer: CreateCustomerDto.Request
  ): Promise<CreateCustomerDto.Response | Customer | null> {
    const { customer_addresses, user_id, ...rest } = customer;
    const customerExists = await this.prisma.customer.findFirst({
      where: {
        AND: [{ identification: customer.identification }, { deleted_at: null }]
      }
    });
    const findUser = await this.prisma.user.findFirst({
      where: {
        id: user_id
      }
    });
    if (customerExists || !findUser) {
      throw new HttpException('User Already have a customer account', 400);
    } else {
      return await this.prisma.customer.create({
        data: {
          ...rest,
          user: {
            connect: { id: findUser.id }
          },
          customer_addresses: {
            connect: customer_addresses
          }
        },
        include: {
          customer_addresses: true // Include all posts in the returned object
        }
      });
    }

    return null;
  }

  async softDelete(id: string): Promise<Customer | null> {
    const now = new Date(Date.now());
    const userNotDeleted = await this.prisma.customer.findFirst({
      where: {
        AND: [{ id }, { deleted_at: null }]
      }
    });
    if (!userNotDeleted) {
      return null;
    }
    // o correto seria eu colocar um _old no final do email
    return await this.prisma.customer.update({
      where: {
        id
      },
      data: {
        deleted_at: now
      }
    });
  }
}
