import { PrismaStrategy } from '../strategies/prisma/prisma.strategy';
import { CustomerAddress, Prisma } from '@prisma/client';

import { HttpException, NotFoundException } from '@nestjs/common';
import { Customer } from 'src/core/customers/customer';
import { CreateCustomerDto } from 'src/presentation/http/customers/create-customer.dto';
import { CreateCustomerAddressDto } from 'src/presentation/http/customer_addresses/create-customer_address.dto';
export class CustomerAddressesRepository {
  constructor(private prisma: PrismaStrategy) {
    this.prisma = new PrismaStrategy();
  }

  async findAll() {
    return this.prisma.customerAddress.findMany();
  }

  async findByUnique(userWhereUniqueInput: Prisma.ProductWhereUniqueInput) {
    return null;
  }
  async findMany(user: Prisma.ProductCreateInput) {
    return await this.prisma.customerAddress;
  }

  async findOne(id: string) {
    return await this.prisma.customerAddress.findFirst({
      where: {
        AND: [{ id }, { deleted_at: null }]
      }
    });
  }

  async exists(id: string) {
    return await this.prisma.customerAddress.findFirst({
      where: {
        AND: [{ id }, { deleted_at: null }]
      }
    });
  }

  async updateByUnique(
    { id },
    data: Prisma.CustomerAddressUpdateInput | any
  ): Promise<CustomerAddress | null> {
    const userExists = await this.findOne(id);
    if (userExists) {
      return await this.prisma.customerAddress.update({
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
    customerAddress: Prisma.CustomerAddressCreateInput &
      CreateCustomerAddressDto.Request
  ): Promise<CreateCustomerAddressDto.Response | CustomerAddress | null> {
    const { customer_id, ...rest } = customerAddress;
    const customerExists = this.prisma.customer.findFirst({
      where: {
        AND: [{ id: customer_id }, { deleted_at: null }]
      }
    });
    if (!customerExists) {
      throw new NotFoundException();
    }

    return await this.prisma.customerAddress.create({
      data: {
        ...rest,
        Customer: {
          connect: { id: customer_id }
        }
      }
    });
  }

  async softDelete(id: string): Promise<CustomerAddress | null> {
    const now = new Date(Date.now());
    const userNotDeleted = await this.prisma.customerAddress.findFirst({
      where: {
        AND: [{ id }, { deleted_at: null }]
      }
    });
    if (!userNotDeleted) {
      return null;
    }
    // o correto seria eu colocar um _old no final do email
    return await this.prisma.customerAddress.update({
      where: {
        id
      },
      data: {
        deleted_at: now
      }
    });
  }
}
