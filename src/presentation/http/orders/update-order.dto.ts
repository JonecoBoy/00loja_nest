import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsObject, IsOptional, IsUUID } from 'class-validator';
import { Customer } from 'src/core/customers/customer';
import { CustomerAddress } from 'src/core/customer_addresses/customerAddress';
import { Product } from 'src/core/products/product';

export namespace UpdateOrderDto {
  export class RequestParam {
    @ApiProperty({
      required: false,
      example: 'Comment',
      description: 'Comment for the order'
    })
    @IsUUID()
    id: string;
  }

  export class RequestBody {
    @ApiProperty({
      required: false,
      example: 'Comment',
      description: 'Comment for the order'
    })
    @IsOptional()
    comment: string;

    @ApiProperty({
      required: false,
      example: 'Products',
      description: 'related products of the order'
    })
    @IsArray()
    @IsOptional()
    products: Product[];

    @ApiProperty({
      required: false,
      example: 'Customer',
      description: 'related customer of the order'
    })
    @IsObject()
    @IsOptional()
    customers: Customer;
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
