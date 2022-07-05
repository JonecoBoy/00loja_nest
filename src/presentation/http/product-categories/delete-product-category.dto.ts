import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsUUID, Length } from 'class-validator';
import { Role } from '@prisma/client';

export namespace DeleteProductCategoryDto {
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
    main_category: string;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
  }
}
