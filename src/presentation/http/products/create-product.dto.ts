import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsObject,
  IsOptional,
  IsPositive,
  IsString,
  Length
} from 'class-validator';
import { WeightUnit, LengthUnit, Image, ProductFile } from '@prisma/client';
import { ProductCategory } from 'src/core/product-categories/product-category';
export namespace CreateProductDto {
  export class Request {
    @ApiProperty({
      required: true,
      example: 'Apple Watch',
      description: 'Name of the Product'
    })
    @IsString()
    name: string;

    @ApiProperty({
      required: true,
      example: 'Smart Watch from Apple',
      description: 'Description of the Product'
    })
    @IsString()
    description: string;

    @ApiProperty({
      required: true,
      example: 'apple-watch',
      description: 'SLUG for better SEO performance'
    })
    @IsString()
    slug: string;

    @ApiProperty({
      required: true,
      example: 'app1',
      description: 'SKU for the product'
    })
    @IsString()
    sku: string;

    @ApiProperty({
      required: true,
      example: '200',
      description: 'Price of the Product'
    })
    @IsPositive()
    price: number;

    @ApiProperty({
      required: true,
      example: 'g / kg',
      description: 'Weight Unit'
    })
    @IsString()
    weight_unit: WeightUnit;

    @ApiProperty({
      required: true,
      example: '5',
      description: 'Weight in respective unit'
    })
    @IsPositive()
    weight: number;
    @ApiProperty({
      required: true,
      example: 'mm / cm / m',
      description: 'Weight Unit'
    })
    @IsString()
    length_unit: LengthUnit;
    @ApiProperty({
      required: true,
      example: '5',
      description: 'Length in respective unit'
    })
    @IsPositive()
    length: number;
    @ApiProperty({
      required: true,
      example: '5',
      description: 'Width in respective unit'
    })
    @IsPositive()
    width: number;
    @ApiProperty({
      required: true,
      example: '5',
      description: 'Height in respective unit'
    })
    @IsPositive()
    height: number;
    @ApiProperty({
      required: true,
      example: '1',
      description: 'Minimum Order Amount'
    })
    @IsPositive()
    minimum_amount: number;
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
