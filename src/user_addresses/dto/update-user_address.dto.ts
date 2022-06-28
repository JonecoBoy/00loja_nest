import { PartialType } from '@nestjs/mapped-types';
import { CreateUserAddressDto } from './create-user_address.dto';

export class UpdateUserAddressDto extends PartialType(CreateUserAddressDto) {}
