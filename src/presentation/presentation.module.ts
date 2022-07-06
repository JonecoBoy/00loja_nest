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
import { CustomersController } from './http/customers/customers.controller';
import { CustomersService } from 'src/core/customers/services/customers.service';
import { CustomersRepository } from 'src/infra/repositories/customers.repository';
import { ListAllCustomersAdapter } from './http/customers/adapters/list-all-customers.adapter';
import { FindCustomerAdapter } from './http/customers/adapters/find-product.adapter';
import { FindCustomerAddressAdapter } from './http/customer_addresses/adapters/find-customer_address.adapter';
import { ListAllCustomerAddressesAdapter } from './http/customer_addresses/adapters/list-all-customer_addresses.adapter';
import { CustomerAddressesService } from 'src/core/customer_addresses/services/customer_address.service';
import { CustomerAddressesRepository } from 'src/infra/repositories/customer_addresses.repository';
import { CustomerAddressesController } from './http/customer_addresses/customer_addresses.controller';
import { OrdersController } from './http/orders/orders.controller';
import { OrdersService } from 'src/core/orders/services/orders.service';
import { OrdersRepository } from 'src/infra/repositories/orders.repository';
import { ListAllOrdersAdapter } from './http/orders/adapters/list-all-orders.adapter';
import { UpdateCustomerAdapter } from './http/customer_addresses/adapters/update-customer.adapter';
import { UpdateOrderAdapter } from './http/orders/adapters/update-order.adapter';
import { FindOrderAdapter } from './http/orders/adapters/find-order.adapter';
import { DeleteOrderAdapter } from './http/orders/adapters/delete-order.adapter';

//todo remover e por em modulos separados users, products etc...
@Module({
  imports: [RepositoriesModule, CoreModule, PassportModule],
  controllers: [
    UsersController,
    AuthController,
    ProductCategoriesController,
    ProductsController,
    CustomersController,
    CustomerAddressesController,
    OrdersController
  ],
  providers: [
    UsersService,
    ProductCategoriesService,
    ProductsService,
    CustomersService,
    CustomerAddressesService,
    OrdersService,
    PrismaStrategy,
    BasicStrategy,
    JwtStrategy,
    RolesGuard,
    UsersRepository,
    ProductCategoriesRepository,
    ProductsRepository,
    CustomersRepository,
    CustomerAddressesRepository,
    OrdersRepository,
    ListAllUsersAdapter,
    GetUserAdapter,
    DeleteUserAdapter,
    UpdateUserAdapter,
    ListAllProductsAdapter,
    CreateProductAdapter,
    FindProductAdapter,
    UpdateProductAdapter,
    DeleteProductAdapter,
    ListAllCustomersAdapter,
    FindCustomerAdapter,
    ListAllCustomerAddressesAdapter,
    FindCustomerAddressAdapter,
    ListAllOrdersAdapter,
    UpdateCustomerAdapter,
    UpdateOrderAdapter,
    FindOrderAdapter,
    DeleteOrderAdapter
  ]
})
export class PresentationModule {}
