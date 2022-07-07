import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Request,
  Put
} from '@nestjs/common';
import {
  ApiBasicAuth,
  ApiBearerAuth,
  ApiResponse,
  ApiTags
} from '@nestjs/swagger';
import { ProductCategory } from 'src/core/product-categories/product-category';
import { ProductCategoriesService } from 'src/core/product-categories/services/product-categories.service';
import { JwtAuthGuard } from 'src/presentation/auth/guards/jwt.guard';
import { RolesGuard } from 'src/presentation/auth/guards/roles.guard';
import { Roles } from 'src/presentation/auth/roles/role.decorator';
import { Role } from 'src/presentation/auth/roles/role.enum';
import { ResultErrorDto } from 'src/presentation/error/error.dto';
import { CreateUserDto } from '../users/create-user.dto';
import { CreateProductCategoryDto } from './create-product-category.dto';
import { DeleteProductCategoryDto } from './delete-product-category.dto';
import { FindProductCategoryDto } from './find-product-category.dto';
import { ProductCategoryListDto } from './list-product-categories.dto';
import { UpdateProductCategoryDto } from './update-product-category.dto';

@ApiTags('product_categories')
@Controller('product_categories')
export class ProductCategoriesController {
  constructor(
    private readonly productCategoriesService: ProductCategoriesService
  ) {}

  @ApiResponse({
    status: 201,
    type: CreateProductCategoryDto.Response,
    isArray: true,
    description: 'Product Category succesfully created'
  })
  @ApiResponse({
    status: 401,
    type: ResultErrorDto,
    isArray: false,
    description: 'Product Category user not created'
  })
  @ApiBearerAuth()
  @Get()
  async findAll(): Promise<ProductCategoryListDto.Response> {
    const modelResponse = await this.productCategoriesService.findAll();
    return modelResponse;
  }

  @ApiResponse({
    status: 201,
    type: CreateProductCategoryDto.Request,
    isArray: false,
    description: 'Product Category succesfully finded'
  })
  @ApiResponse({
    status: 401,
    type: ResultErrorDto,
    isArray: false,
    description: 'Error Product Category not finded'
  })
  @ApiBearerAuth()
  @Get(':id')
  async findOne(
    @Param() params: any
  ): Promise<FindProductCategoryDto.Response> {
    const { id } = params;
    const modelResponse = await this.productCategoriesService.findOne(id);
    return modelResponse;
  }

  @ApiResponse({
    status: 201,
    type: CreateUserDto.Response,
    isArray: false,
    description: 'Product Category succesfully created'
  })
  @ApiResponse({
    status: 401,
    type: ResultErrorDto,
    isArray: false,
    description: 'Error Product Category not created'
  })
  @Post()
  async create(
    @Body() body: CreateProductCategoryDto.Request
  ): Promise<CreateProductCategoryDto.Response> {
    const modelResponse =
      await this.productCategoriesService.createProductCategory(body);
    return modelResponse;
  }

  @ApiResponse({
    status: 201,
    // type: UpdateUserDto.Response,
    isArray: false,
    description: 'Product Category succesfully edited'
  })
  @ApiResponse({
    status: 401,
    // type: ResultErrorDto,
    isArray: false,
    description: 'Error Product Category not edited'
  })
  @ApiBearerAuth()
  @Put(':id')
  @Roles(Role.ADMIN, Role.USER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async update(
    @Param() id: UpdateProductCategoryDto.RequestParam,
    @Body() body: UpdateProductCategoryDto.RequestBody
  ): Promise<UpdateProductCategoryDto.Response> {
    const modelResponse = await this.productCategoriesService.updateByUnique(
      id,
      body
    );
    return modelResponse;
  }

  @ApiResponse({
    status: 201,
    type: DeleteProductCategoryDto.Response,
    isArray: false,
    description: 'Product Category succesfully deleted'
  })
  @ApiResponse({
    status: 401,
    type: ResultErrorDto,
    isArray: false,
    description: 'Error Product Category not deleted'
  })
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  @Delete(':id')
  async delete(
    @Param() params: any
  ): Promise<DeleteProductCategoryDto.Response> {
    const { id } = params;
    const modelResponse = await this.productCategoriesService.softDelete(id);
    return modelResponse;
  }
}
