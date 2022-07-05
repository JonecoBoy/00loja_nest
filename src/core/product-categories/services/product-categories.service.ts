import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { ProductCategory } from '../product-category';
import { CreateProductCategoryDto } from 'src/presentation/http/product-categories/create-product-category.dto';
import { ProductCategoriesRepository } from 'src/infra/repositories/product-categories.repository';
import { UpdateProductCategoryDto } from 'src/presentation/http/product-categories/update-product-category.dto';
@Injectable()
export class ProductCategoriesService {
  constructor(
    private productCategoriesRepository: ProductCategoriesRepository
  ) {}
  findAll(): Promise<Array<ProductCategory>> {
    const result = this.productCategoriesRepository.findAll();
    return result;
  }

  async findOne(id: string): Promise<ProductCategory> {
    const productCategory = await this.productCategoriesRepository.findOne(id);
    if (!productCategory) {
      throw new NotFoundException();
    }
    return productCategory;
  }

  async softDelete(id: string): Promise<ProductCategory> {
    const productCategory = await this.productCategoriesRepository.softDelete(
      id
    );
    if (!productCategory) {
      throw new NotFoundException();
    }
    return productCategory;
  }

  async createProductCategory(
    input: CreateProductCategoryDto.Request
  ): Promise<ProductCategory> {
    return await this.productCategoriesRepository.create(input);
  }

  async updateByUnique(
    id: UpdateProductCategoryDto.RequestParam,
    data: UpdateProductCategoryDto.RequestBody
  ) {
    return await this.productCategoriesRepository.updateByUnique(id, data);
  }
}
