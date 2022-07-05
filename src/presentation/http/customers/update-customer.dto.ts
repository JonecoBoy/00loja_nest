import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString, IsUUID } from 'class-validator';
import { CustomerAddress, IdentificationType } from '@prisma/client';

export namespace UpdateCustomerDto {
  export class RequestParam {
    @ApiProperty({
      required: true,
      example: '87c57402-80cc-45ab-9eea-a8a4919cad03',
      description: 'Customer UUID'
    })
    @IsUUID()
    id: string;
  }
  export class RequestBody {
    @ApiProperty({
      required: true,
      example: '057e0255-e3fa-4a6f-8101-510c8e6b060b',
      description: 'User UUID'
    })
    @IsUUID()
    @IsOptional()
    user_id: string;

    @ApiProperty({
      required: false,
      example: '12345678910',
      description: 'identity number'
    })
    @IsString()
    @IsOptional()
    identification?: string;

    @ApiProperty({
      required: false,
      example: 'CPF',
      description: 'Identification Type CPF/CNPJ/PASSPORT'
    })
    @IsOptional()
    identification_type?: IdentificationType;

    @ApiProperty({
      required: false,
      example: 'smart-watch',
      description: 'Slug for SEO performance'
    })
    @IsArray()
    @IsOptional()
    customer_addresses?: CustomerAddress[];
  }
  export class Response {
    id: string;
    user_id: string;
    identification: string;
    identification_type: IdentificationType;
    customers_addresses?: CustomerAddress[];
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
  }
}
