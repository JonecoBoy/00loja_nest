import { Module } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomersController } from './controllers/customers.controller';

@Module({
  controllers: [CustomersController],
  providers: [CustomersService]
})
export class CustomersModule {}
