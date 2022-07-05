import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, Length } from 'class-validator';
import { Role } from '@prisma/client';
import { Url } from 'url';
export namespace CreateProductCategoryDto {
  export class Request {
    @ApiProperty({
      required: true,
      example: 'Smart Watchs',
      description: 'Name of the Category'
    })
    @IsString()
    name: string;

    @ApiProperty({
      required: true,
      example:
        'Here you find the most technological smart watches of the market.',
      description: 'Description of your category'
    })
    @IsString()
    description?: string;

    @ApiProperty({
      required: true,
      example: 'smart-watchs',
      description: 'Slug for SEO performance'
    })
    @IsString()
    slug: string;

    @ApiProperty({
      required: true,
      example: 'Electronics',
      description: 'uuid of the main category'
    })
    @IsString()
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
