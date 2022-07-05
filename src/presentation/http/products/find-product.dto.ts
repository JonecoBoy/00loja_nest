import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsUUID, Length } from 'class-validator';
import { WeightUnit, LengthUnit, Image, ProductFile } from '@prisma/client';

export namespace FindProductDto {
  export class Request {
    @ApiProperty({
      required: true,
      example: '057e0255-e3fa-4a6f-8101-510c8e6b060b',
      description: 'Product Category ID - uuid'
    })
    @IsUUID()
    id: string;
  }
  export class Response {
    id: string;
    name: string;
    description: string;
    slug: string;
    sku: string;
    price: number;
    weight_unit: string;
    weight: number;
    length_unit: LengthUnit;
    lengt: number;
    width: number;
    height: number;
    minimum_amount: number;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
  }
}
