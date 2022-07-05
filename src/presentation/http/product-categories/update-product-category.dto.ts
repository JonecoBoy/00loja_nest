import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsOptional,
  IsString,
  IsUUID,
  Length,
  UUIDVersion
} from 'class-validator';
import { Role } from '@prisma/client';

export namespace UpdateProductCategoryDto {
  export class RequestParam {
    @ApiProperty({
      required: true,
      example: '057e0255-e3fa-4a6f-8101-510c8e6b060b',
      description: 'User ID - uuid'
    })
    @IsUUID()
    id: string;
  }
  export class RequestBody {
    @ApiProperty({
      required: false,
      example: 'Smart Watches',
      description: 'Name of the product category'
    })
    @IsString()
    @IsOptional()
    name?: string;

    @ApiProperty({
      required: false,
      example: 'Tech Watchs',
      description: 'Description of the product category'
    })
    @IsOptional()
    description?: string;

    @ApiProperty({
      required: false,
      example: 'smart-watch',
      description: 'Slug for SEO performance'
    })
    @Length(4, 12)
    @IsOptional()
    slug?: string;

    @ApiProperty({
      required: false,
      example: 'Electronics',
      description: 'Main category'
    })
    @IsOptional()
    main_category?: string;
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
