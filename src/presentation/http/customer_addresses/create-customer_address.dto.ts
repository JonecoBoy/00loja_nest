import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export namespace CreateCustomerAddressDto {
  export class Request {
    @ApiProperty({
      required: true,
      example: 'Casa',
      description: 'Description of the address'
    })
    @IsOptional()
    description: string;

    @ApiProperty({
      required: true,
      example: 'Jonas',
      description: 'First Name'
    })
    @IsString()
    first_name: string;

    @ApiProperty({
      required: true,
      example: 'Nunes',
      description: 'Last Name'
    })
    @IsString()
    last_name: string;

    @ApiProperty({
      required: false,
      example: 'InfNet',
      description: 'Company'
    })
    @IsString()
    company: string;

    @ApiProperty({
      required: false,
      example: 'Rua Barão de Mesquita',
      description: 'Street Name'
    })
    @IsString()
    street: string;

    @ApiProperty({
      required: false,
      example: '20',
      description: 'Address number'
    })
    @IsNumber()
    number: number;

    @ApiProperty({
      required: false,
      example: 'apto 301',
      description: 'Address complement'
    })
    @IsString()
    complement: string;

    @ApiProperty({
      required: false,
      example: 'Tijuca',
      description: 'Nighboorhood Name'
    })
    @IsString()
    neighboorhood: string;

    @ApiProperty({
      required: true,
      example: 'Rio de Janeiro',
      description: 'City of the address'
    })
    @IsString()
    city: string;

    @ApiProperty({
      required: true,
      example: 'RJ',
      description: 'State of the address'
    })
    @IsString()
    state: string;

    @ApiProperty({
      required: true,
      example: 'RJ',
      description: 'State of the address'
    })
    @IsString()
    country: string;

    @ApiProperty({
      required: true,
      example: 'Brasil',
      description: 'Country of the address'
    })
    @IsString()
    postcode: string;

    @ApiProperty({
      required: false,
      example: 'Brasil',
      description: 'Country of the address'
    })
    @IsUUID()
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
