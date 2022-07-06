import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  IsUUID
} from 'class-validator';
import { Customer } from 'src/core/customers/customer';
import { CustomerAddress } from 'src/core/customer_addresses/customerAddress';
import { Product } from 'src/core/products/product';

export namespace CreateOrderDto {
  export class Request {
    @ApiProperty({
      required: false,
      example: 'Comment',
      description: 'Comment for the order'
    })
    @IsOptional()
    comment: string;

    @ApiProperty({
      required: true,
      example: 'Products',
      description: 'related products of the order'
    })
    @IsArray()
    products: Product[];

    @ApiProperty({
      required: true,
      example: 'Customer UUID',
      description: 'related customer of the order'
    })
    @IsUUID()
    customer_id: string;

    @ApiProperty({
      required: true,
      example: 'Customer Address UUID',
      description: 'Address to deliver the order'
    })
    @IsUUID()
    customer_address_id: string;
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
