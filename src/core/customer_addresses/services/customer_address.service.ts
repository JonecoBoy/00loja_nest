import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CustomerAddressesRepository } from 'src/infra/repositories/customer_addresses.repository';
import { CreateCustomerAddressDto } from 'src/presentation/http/customer_addresses/create-customer_address.dto';
import { CustomerAddressListDtoResponseItemType } from 'src/presentation/http/customer_addresses/list-customer_address.dto';
import { UpdateCustomerAddressDto } from 'src/presentation/http/customer_addresses/update-customer_address.dto';
import { CustomerAddress } from '../customerAddress';
@Injectable()
export class CustomerAddressesService {
  constructor(
    private customerAddressesRepository: CustomerAddressesRepository
  ) {}
  findAll(): Promise<
    Array<CustomerAddress> | Array<CustomerAddressListDtoResponseItemType>
  > {
    const result = this.customerAddressesRepository.findAll();
    return result;
  }

  async findOne(
    id: string
  ): Promise<CustomerAddress | CustomerAddressListDtoResponseItemType> {
    const productCategory = await this.customerAddressesRepository.findOne(id);
    if (!productCategory) {
      throw new NotFoundException();
    }
    return productCategory;
  }

  async softDelete(id: string): Promise<CustomerAddress> {
    const productCategory = await this.customerAddressesRepository.softDelete(
      id
    );
    if (!productCategory) {
      throw new NotFoundException();
    }
    return productCategory;
  }

  async create(
    input: CreateCustomerAddressDto.Request
  ): Promise<CustomerAddress | CreateCustomerAddressDto.Response> {
    return await this.customerAddressesRepository.create(input);
  }

  async updateByUnique(
    id: UpdateCustomerAddressDto.RequestParam,
    data: UpdateCustomerAddressDto.RequestBody
  ) {
    return await this.customerAddressesRepository.updateByUnique(id, data);
  }
}
