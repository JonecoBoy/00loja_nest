import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID
} from 'class-validator';

export namespace UpdateCustomerAddressDto {
  export class RequestParam {
    @ApiProperty({
      required: false,
      example: '87c57402-80cc-45ab-9eea-a8a4919cad03',
      description: 'Customer UUID'
    })
    @IsUUID()
    id: string;
  }
  export class RequestBody {
    @ApiProperty({
      required: false,
      example: 'Casa',
      description: 'Description of the address'
    })
    @IsOptional()
    description: string;

    @ApiProperty({
      required: false,
      example: 'Jonas',
      description: 'First Name'
    })
    @IsString()
    @IsOptional()
    first_name: string;

    @ApiProperty({
      required: false,
      example: 'Nunes',
      description: 'Last Name'
    })
    @IsString()
    @IsOptional()
    last_name: string;

    @ApiProperty({
      required: false,
      example: 'InfNet',
      description: 'Company'
    })
    @IsString()
    @IsOptional()
    company: string;

    @ApiProperty({
      required: false,
      example: 'Rua Barão de Mesquita',
      description: 'Street Name'
    })
    @IsString()
    @IsOptional()
    street: string;

    @ApiProperty({
      required: false,
      example: '20',
      description: 'Address number'
    })
    @IsNumber()
    @IsOptional()
    number: number;

    @ApiProperty({
      required: false,
      example: 'apto 301',
      description: 'Address complement'
    })
    @IsString()
    @IsOptional()
    complement: string;

    @ApiProperty({
      required: false,
      example: 'Tijuca',
      description: 'Nighboorhood Name'
    })
    @IsString()
    @IsOptional()
    neighboorhood: string;

    @ApiProperty({
      required: false,
      example: 'Rio de Janeiro',
      description: 'City of the address'
    })
    @IsString()
    @IsOptional()
    city: string;

    @ApiProperty({
      required: false,
      example: 'RJ',
      description: 'State of the address'
    })
    @IsString()
    @IsOptional()
    state: string;

    @ApiProperty({
      required: false,
      example: 'RJ',
      description: 'State of the address'
    })
    @IsString()
    @IsOptional()
    country: string;

    @ApiProperty({
      required: false,
      example: 'Brasil',
      description: 'Country of the address'
    })
    @IsString()
    @IsOptional()
    postcode: string;

    @ApiProperty({
      required: false,
      example: 'Brasil',
      description: 'Country of the address'
    })
    @IsUUID()
    @IsOptional()
    customer_id: string;
  }
  export class Response {
    id: string;
    description: string;
    first_name: string;
    last_name: string;
    company?: string;
    street: string;
    number: number;
    complement: string;
    neighboorhood: string;
    city: string;
    state: string;
    country: string;
    postcode: string;
    customer_id: string;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
  }
}
