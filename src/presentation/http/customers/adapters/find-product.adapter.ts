import { Customer } from 'src/core/customers/customer';
import { IBasePresentationAdapter } from '../../base-presentation.adapter';
import { FindCustomerDto } from '../find-customer.dto';
export class FindCustomerAdapter
  implements
    IBasePresentationAdapter<
      Customer | FindCustomerDto.Response,
      FindCustomerDto.Response
    >
{
  public modelToResponse(
    customer: FindCustomerDto.Response & Customer
  ): FindCustomerDto.Response {
    return {
      id: customer.id,
      user_id: customer.user_id,
      identification: customer.identification,
      identification_type: customer.identification_type,
      customers_addresses: customer.customers_addresses,
      created_at: customer.created_at,
      updated_at: customer.updated_at,
      deleted_at: customer.deleted_at
    };
  }
  public requestToModel() {
    return null;
  }
}
