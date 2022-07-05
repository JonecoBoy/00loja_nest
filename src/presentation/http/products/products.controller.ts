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
import { JwtAuthGuard } from 'src/presentation/auth/guards/jwt.guard';
import { RolesGuard } from 'src/presentation/auth/guards/roles.guard';
import { ResultErrorDto } from 'src/presentation/error/error.dto';
import { CreateUserDto } from '../users/create-user.dto';
import { CreateProductDto } from './create-product.dto';
import { DeleteProductDto } from './delete-product.dto';
import { UpdateProductDto } from './update-product.dto';
import { ProductListDto } from './list-product.dto';
import { Roles } from 'src/presentation/auth/roles/role.decorator';
import { Role } from 'src/presentation/auth/roles/role.enum';
import { FindProductDto } from './find-product.dto';
import { ProductsService } from 'src/core/products/services/products.service';
import { CreateProductAdapter } from './adapters/create-product.adapter';
import { UpdateProductAdapter } from './adapters/update-product.adapter';
import { DeleteProductAdapter } from './adapters/delete-product.adapter';
import { FindProductAdapter } from './adapters/find-product.adapter';
import { ListAllProductsAdapter } from './adapters/list-all-products.adapter';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly listAllProductsAdapter: ListAllProductsAdapter,
    private readonly createProductAdapter: CreateProductAdapter,
    private readonly findProductAdapter: FindProductAdapter,
    private readonly updateProductAdapter: UpdateProductAdapter,
    private readonly deleteProductAdapter: DeleteProductAdapter
  ) {}

  @ApiResponse({
    status: 201,
    type: CreateProductDto.Response,
    isArray: false,
    description: 'Product succesfully created'
  })
  @ApiResponse({
    status: 401,
    type: ResultErrorDto,
    isArray: false,
    description: 'Product user not created'
  })
  @ApiBearerAuth()
  @Get()
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async findAll(): Promise<ProductListDto.Response> {
    const modelResponse = await this.productsService.findAll();
    const dtoResponse =
      this.listAllProductsAdapter.modelToResponse(modelResponse);
    return dtoResponse;
  }

  @ApiResponse({
    status: 201,
    type: CreateProductDto.Request,
    isArray: false,
    description: 'Product succesfully finded'
  })
  @ApiResponse({
    status: 401,
    type: ResultErrorDto,
    isArray: false,
    description: 'Error Product not finded'
  })
  @ApiBearerAuth()
  @Get(':id')
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async findOne(@Param() params: any): Promise<FindProductDto.Response> {
    const { id } = params;
    const modelResponse = await this.productsService.findOne(id);
    const dtoResponse = this.findProductAdapter.modelToResponse(modelResponse);
    return dtoResponse;
  }

  @ApiResponse({
    status: 201,
    type: CreateUserDto.Response,
    isArray: false,
    description: 'Product succesfully created'
  })
  @ApiResponse({
    status: 401,
    type: ResultErrorDto,
    isArray: false,
    description: 'Error Product not created'
  })
  @Post()
  async create(
    @Body() body: CreateProductDto.Request
  ): Promise<CreateProductDto.Response> {
    const result = await this.productsService.createProduct(body);
    // const dtoResponse =
    //   this.createProductAdapter.modelToResponse(modelResponse);
    return result;
  }

  @ApiResponse({
    status: 201,
    // type: UpdateUserDto.Response,
    isArray: false,
    description: 'Product succesfully edited'
  })
  @ApiResponse({
    status: 401,
    // type: ResultErrorDto,
    isArray: false,
    description: 'Error Product not edited'
  })
  @ApiBearerAuth()
  @Put(':id')
  @Roles(Role.ADMIN, Role.USER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async update(
    @Param() id: UpdateProductDto.RequestParam,
    @Body() body: UpdateProductDto.RequestBody
  ): Promise<UpdateProductDto.Response> {
    const modelResponse = await this.productsService.updateByUnique(id, body);
    const dtoResponse =
      this.updateProductAdapter.modelToResponse(modelResponse);
    return dtoResponse;
  }

  @ApiResponse({
    status: 201,
    type: DeleteProductDto.Response,
    isArray: false,
    description: 'Product succesfully deleted'
  })
  @ApiResponse({
    status: 401,
    type: ResultErrorDto,
    isArray: false,
    description: 'Error Product not deleted'
  })
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  @Delete(':id')
  async delete(@Param() params: any): Promise<DeleteProductDto.Response> {
    const { id } = params;
    const modelResponse = await this.productsService.softDelete(id);
    const dtoResponse =
      this.deleteProductAdapter.modelToResponse(modelResponse);
    return dtoResponse;
  }
}
