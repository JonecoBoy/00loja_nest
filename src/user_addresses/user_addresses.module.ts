import { Module } from '@nestjs/common';
import { UserAddressesService } from './user_addresses.service';
import { UserAddressesController } from './user_addresses.controller';

@Module({
  controllers: [UserAddressesController],
  providers: [UserAddressesService]
})
export class UserAddressesModule {}
