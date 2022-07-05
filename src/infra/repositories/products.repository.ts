import { PrismaStrategy } from '../strategies/prisma/prisma.strategy';
import { Prisma } from '@prisma/client';

import { HttpException, NotFoundException } from '@nestjs/common';
import { Product } from 'src/core/products/product';
import { CreateProductDto } from 'src/presentation/http/products/create-product.dto';
export class ProductsRepository {
  constructor(private prisma: PrismaStrategy) {
    this.prisma = new PrismaStrategy();
  }

  async findAll() {
    return this.prisma.product.findMany();
  }

  async findByUnique(userWhereUniqueInput: Prisma.ProductWhereUniqueInput) {
    return null;
  }
  async findMany(user: Prisma.ProductCreateInput) {
    return await this.prisma.product;
  }

  async findOne(id: string) {
    return await this.prisma.product.findFirst({
      where: {
        AND: [{ id }, { deleted_at: null }]
      }
    });
  }

  async updateByUnique(
    { id },
    data: Prisma.ProductUpdateInput
  ): Promise<Product | null> {
    return await this.prisma.product.update({
      where: {
        id
      },
      data
    });
  }

  async create(
    product: CreateProductDto.Request
  ): Promise<CreateProductDto.Response | null> {
    const { product_categories, ...rest } = product;
    const productExists = await this.prisma.product.findFirst({
      where: { AND: [{ slug: product.slug }, { deleted_at: null }] }
    });
    if (productExists) {
      throw new HttpException('Slug already in use', 400);
    } else {
      const teste = await this.prisma.product.create({
        data: {
          ...rest,
          product_categories: {
            connect: product_categories
          }
        },
        include: {
          product_categories: true // Include all posts in the returned object
        }
      });
      console.log(teste);
      return teste;
    }

    return null;
  }

  async softDelete(id: string): Promise<Product | null> {
    const now = new Date(Date.now());
    const userNotDeleted = await this.prisma.product.findFirst({
      where: {
        AND: [{ id }, { deleted_at: null }]
      }
    });
    if (!userNotDeleted) {
      return null;
    }
    // o correto seria eu colocar um _old no final do email
    return await this.prisma.product.update({
      where: {
        id
      },
      data: {
        deleted_at: now
      }
    });
  }
}
