import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { CustomersModule } from './customers/customers.module';
import { UserAddressesModule } from './user_addresses/user_addresses.module';

@Module({
  imports: [UsersModule, ProductsModule, OrdersModule, CustomersModule, UserAddressesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
