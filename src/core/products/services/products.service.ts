import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { ProductsRepository } from 'src/infra/repositories/products.repository';
import { CreateProductDto } from 'src/presentation/http/products/create-product.dto';
import { UpdateProductDto } from 'src/presentation/http/products/update-product.dto';
import { Product } from '../product';
@Injectable()
export class ProductsService {
  constructor(private productsRepository: ProductsRepository) {}
  findAll(): Promise<Array<Product>> {
    const result = this.productsRepository.findAll();
    return result;
  }

  async findOne(id: string): Promise<Product> {
    const productCategory = await this.productsRepository.findOne(id);
    if (!productCategory) {
      throw new NotFoundException();
    }
    return productCategory;
  }

  async softDelete(id: string): Promise<Product> {
    const productCategory = await this.productsRepository.softDelete(id);
    if (!productCategory) {
      throw new NotFoundException();
    }
    return productCategory;
  }

  async createProduct(
    input: CreateProductDto.Request
  ): Promise<Product | CreateProductDto.Response> {
    return await this.productsRepository.create(input);
  }

  async updateByUnique(
    id: UpdateProductDto.RequestParam,
    data: UpdateProductDto.RequestBody
  ) {
    return await this.productsRepository.updateByUnique(id, data);
  }
}
