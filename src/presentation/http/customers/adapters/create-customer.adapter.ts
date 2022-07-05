import { Customer } from 'src/core/customer/costumer';
import { IBasePresentationAdapter } from '../../base-presentation.adapter';
import { CreateCustomerDto } from '../create-customer.dto';
export class CreateProductAdapter
  implements IBasePresentationAdapter<Customer, CreateCustomerDto.Response>
{
  public modelToResponse(
    customer: CreateCustomerDto.Response
  ): CreateCustomerDto.Response {
    return {
      id: customer.id,
      user_id: customer.user_id,
      identification: customer.identification,
      identification_type: customer.identification_type,
      created_at: customer.created_at,
      updated_at: customer.updated_at,
      deleted_at: customer.deleted_at
    };
  }
  public requestToModel() {
    return null;
  }
}
