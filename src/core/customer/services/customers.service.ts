import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CustomersRepository } from 'src/infra/repositories/customers.repository';
import { CreateCustomerDto } from 'src/presentation/http/customers/create-customer.dto';
import {
  CustomerListDto,
  CustomerListDtoResponseItemType
} from 'src/presentation/http/customers/list-customer.dto';
import { UpdateCustomerDto } from 'src/presentation/http/customers/update-customer.dto';
import { Customer } from '../customer';
@Injectable()
export class CustomersService {
  constructor(private customersRepository: CustomersRepository) {}
  findAll(): Promise<Array<Customer> | Array<CustomerListDtoResponseItemType>> {
    const result = this.customersRepository.findAll();
    return result;
  }

  async findOne(
    id: string
  ): Promise<Customer | CustomerListDtoResponseItemType> {
    const productCategory = await this.customersRepository.findOne(id);
    if (!productCategory) {
      throw new NotFoundException();
    }
    return productCategory;
  }

  async softDelete(id: string): Promise<Customer> {
    const productCategory = await this.customersRepository.softDelete(id);
    if (!productCategory) {
      throw new NotFoundException();
    }
    return productCategory;
  }

  async create(
    input: CreateCustomerDto.Request
  ): Promise<Customer | CreateCustomerDto.Response> {
    return await this.customersRepository.create(input);
  }

  async updateByUnique(
    id: UpdateCustomerDto.RequestParam,
    data: UpdateCustomerDto.RequestBody
  ) {
    return await this.customersRepository.updateByUnique(id, data);
  }
}
