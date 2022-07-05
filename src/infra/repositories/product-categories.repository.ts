import { PrismaStrategy } from '../strategies/prisma/prisma.strategy';
import { Prisma } from '@prisma/client';
import { User } from 'src/core/users/user';
import { CreateUserDto } from 'src/presentation/http/users/create-user.dto';
import { HttpException, NotFoundException } from '@nestjs/common';
import { Role } from 'src/presentation/auth/roles/role.enum';
import { CreateProductCategoryDto } from 'src/presentation/http/product-categories/create-product-category.dto';
import { ProductCategory } from 'src/core/product-categories/product-category';
export class ProductCategoriesRepository {
  constructor(private prisma: PrismaStrategy) {
    this.prisma = new PrismaStrategy();
  }

  async findAll() {
    return this.prisma.productCategory.findMany();
  }

  async findByUnique(userWhereUniqueInput: Prisma.UserWhereUniqueInput) {
    return null;
  }

  async checkLogin(email: string, password: string) {
    return await this.prisma.user.findFirst({
      where: {
        AND: [{ email }, { password }, { deleted_at: null }]
      }
    });
  }

  async checkUserDeleted(email: string) {
    return await this.prisma.user.findFirst({
      where: {
        AND: [{ email }, { deleted_at: null }]
      }
    });
  }

  async findMany(user: Prisma.UserCreateInput) {
    return await this.prisma.user;
  }

  async findOne(id: string) {
    return await this.prisma.productCategory.findFirst({
      where: {
        AND: [{ id }, { deleted_at: null }]
      }
    });
  }
  async findOneByEmail(email) {
    const result = await this.prisma.user.findFirst({
      where: {
        AND: [{ email }, { deleted_at: null }]
      }
    });
    const { password, ...rest } = result;
    return rest;
  }

  async update(user: Prisma.UserUpdateInput) {
    return true;
  }

  async updateByUnique(
    { id },
    data: Prisma.ProductCategoryUpdateInput
  ): Promise<ProductCategory | null> {
    return await this.prisma.productCategory.update({
      where: {
        id
      },
      data
    });
  }

  async create(
    productCategory: CreateProductCategoryDto.Request
  ): Promise<ProductCategory | null> {
    const productCategoryExists = await this.prisma.productCategory.findFirst({
      where: { AND: [{ slug: productCategory.slug }, { deleted_at: null }] }
    });
    if (productCategoryExists) {
      throw new HttpException('Slug already in use', 400);
    } else {
      return await this.prisma.productCategory.create({
        data: productCategory
      });
    }
  }

  async softDelete(id: string): Promise<ProductCategory | null> {
    const now = new Date(Date.now());
    const userNotDeleted = await this.prisma.productCategory.findFirst({
      where: {
        AND: [{ id }, { deleted_at: null }]
      }
    });
    if (!userNotDeleted) {
      return null;
    }
    // o correto seria eu colocar um _old no final do email
    return await this.prisma.productCategory.update({
      where: {
        id
      },
      data: {
        deleted_at: now
      }
    });
  }
}
