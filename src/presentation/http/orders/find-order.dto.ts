import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsUUID, Length } from 'class-validator';
import { CustomerAddress, IdentificationType } from '@prisma/client';
import { Customer } from 'src/core/customers/customer';
import { Product } from 'src/core/products/product';

export namespace FindOrderDto {
  export class Request {
    @ApiProperty({
      required: true,
      example: '057e0255-e3fa-4a6f-8101-510c8e6b060b',
      description: 'Customer uuid'
    })
    @IsUUID()
    id: string;
  }
  export class Response {
    id: string;
    comment?: string;
    products: Product[];
    customer_id: string;
    customer_address_id: string;
    customer?: Customer;
    customer_address?: CustomerAddress;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
  }
}
