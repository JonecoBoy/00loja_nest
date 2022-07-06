import { Customer } from 'src/core/customers/customer';
import { CustomerAddress } from 'src/core/customer_addresses/customerAddress';
import { Product } from 'src/core/products/product';
import { ResultError } from 'src/presentation/error/result.error';

export type OrderListDtoResponseItemType = {
  id: string;
  comment?: string;
  products: Product[];
  customer_id: string;
  customer_address_id: string;
  customer?: Customer;
  customer_address?: CustomerAddress;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
};

// export type UserListDtoResponseType = UserListDtoResponseItemType[];

export namespace OrderListDto {
  export type Response = OrderListDtoResponseItemType[] | ResultError;
}
