import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsUUID, Length } from 'class-validator';
import { Product } from 'src/core/products/product';

export namespace DeleteOrderDto {
  export class Request {
    @ApiProperty({
      required: true,
      example: '057e0255-e3fa-4a6f-8101-510c8e6b060b',
      description: 'Product Customer ID - uuid'
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
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
  }
}
