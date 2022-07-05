import { Customer } from 'src/core/customer/costumer';
import { Product } from 'src/core/products/product';
import { IBasePresentationAdapter } from '../../base-presentation.adapter';
import {
  CustomerListDto,
  CustomerListDtoResponseItemType
} from '../list-customer.dto';
export class ListAllCustomersAdapter
  implements
    IBasePresentationAdapter<
      Array<Customer> | Array<CustomerListDtoResponseItemType>,
      CustomerListDto.Response
    >
{
  public modelToResponse(
    customers: Array<Customer> | Array<CustomerListDtoResponseItemType>
  ): CustomerListDto.Response {
    const ProductsResponse: CustomerListDtoResponseItemType[] = [];
    customers.map((customer) => {
      const tempProduct: CustomerListDtoResponseItemType = {
        id: customer.id,
        user_id: customer.user_id,
        identification: customer.identification,
        identification_type: customer.identification_type,
        customer_addresses: customer.customers_addresses,
        created_at: customer.created_at,
        updated_at: customer.updated_at,
        deleted_at: customer.deleted_at
      };
      ProductsResponse.push(tempProduct);
    });

    return ProductsResponse;
  }
  public requestToModel() {
    return null;
  }
}
