import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsUUID, Length } from 'class-validator';
import { CustomerAddress, IdentificationType } from '@prisma/client';

export namespace FindCustomerAddressDto {
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
