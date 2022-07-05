import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  isNumberString,
  IsObject,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
  Length
} from 'class-validator';
import {
  WeightUnit,
  LengthUnit,
  CustomerAddress,
  IdentificationType
} from '@prisma/client';
export namespace CreateCustomerDto {
  export class Request {
    @ApiProperty({
      required: true,
      example: '959e682a-48a4-438b-af1e-bd36d11d1a11',
      description: 'UUID of the user'
    })
    @IsUUID()
    user_id: string;

    @ApiProperty({
      required: true,
      example: '123.456.789-10',
      description: 'Identification number'
    })
    @IsString()
    identification: string;

    @ApiProperty({
      required: true,
      example: 'CPF',
      description: 'CPF/CNPJ/Passport'
    })
    @IsString()
    identification_type: IdentificationType;

    @ApiProperty({
      required: true,
      example: 'app1',
      description: 'SKU for the product'
    })
    @IsArray()
    @IsOptional()
    customer_addresses: CustomerAddress[];
  }

  export class Response {
    id: string;
    user_id: string;
    identification: string;
    identification_type: IdentificationType;
    // customer_addresses?: CustomerAddress[];
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
  }
}
