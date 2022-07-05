import { ResultError } from 'src/presentation/error/result.error';
import { IdentificationType, CustomerAddress } from '@prisma/client';

export type CustomerListDtoResponseItemType = {
  id: string;
  user_id: string;
  identification: string;
  identification_type: IdentificationType;
  customer_addresses: CustomerAddress;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
};

// export type UserListDtoResponseType = UserListDtoResponseItemType[];

export namespace CustomerListDto {
  export type Response = CustomerListDtoResponseItemType[] | ResultError;
}
