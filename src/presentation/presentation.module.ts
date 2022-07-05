import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { CoreModule } from 'src/core/core.module';
import { UsersService } from 'src/core/users/services/users.service';
import { RepositoriesModule } from 'src/infra/repositories/repositories.module';
import { UsersRepository } from 'src/infra/repositories/users.repository';
import { PrismaStrategy } from 'src/infra/strategies/prisma/prisma.strategy';
import { RolesGuard } from './auth/guards/roles.guard';
import { BasicStrategy } from './auth/strategies/basic.strategy';
import { JwtStrategy } from './auth/strategies/jwt.strategy';
import { AuthController } from './http/auth/auth.controller';
import { DeleteUserAdapter } from './http/users/adapters/delete-user.adapter';
import { GetUserAdapter } from './http/users/adapters/get-user.adapter';
import { ListAllUsersAdapter } from './http/users/adapters/list-all-users.adapter';
import { UpdateUserAdapter } from './http/users/adapters/update-user.adapter';
import { UsersController } from './http/users/users.controller';
import { ProductCategoriesController } from './http/product-categories/product-categories.controller';
import { ProductCategoriesRepository } from 'src/infra/repositories/product-categories.repository';
import { ProductCategoriesService } from 'src/core/product-categories/services/product-categories.service';
import { ProductsController } from './http/products/products.controller';
import { UpdateProductAdapter } from './http/products/adapters/update-product.adapter';
import { FindProductAdapter } from './http/products/adapters/find-product.adapter';
import { CreateProductAdapter } from './http/products/adapters/create-product.adapter';
import { ListAllProductsAdapter } from './http/products/adapters/list-all-products.adapter';
import { ProductsService } from 'src/core/products/services/products.service';
import { ProductsRepository } from 'src/infra/repositories/products.repository';
import { DeleteProductAdapter } from './http/products/adapters/delete-product.adapter';

//todo remover e por em modulos separados users, products etc...
@Module({
  imports: [RepositoriesModule, CoreModule, PassportModule],
  controllers: [
    UsersController,
    AuthController,
    ProductCategoriesController,
    ProductsController
  ],
  providers: [
    UsersService,
    ProductCategoriesService,
    ProductsService,
    PrismaStrategy,
    BasicStrategy,
    JwtStrategy,
    RolesGuard,
    UsersRepository,
    ProductCategoriesRepository,
    ProductsRepository,
    ListAllUsersAdapter,
    GetUserAdapter,
    DeleteUserAdapter,
    UpdateUserAdapter,
    ListAllProductsAdapter,
    CreateProductAdapter,
    FindProductAdapter,
    UpdateProductAdapter,
    DeleteProductAdapter
  ]
})
export class PresentationModule {}
