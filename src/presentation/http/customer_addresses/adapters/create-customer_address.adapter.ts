import { CustomerAddress } from '.prisma/client';
import { Customer } from 'src/core/customers/customer';
import { IBasePresentationAdapter } from '../../base-presentation.adapter';
import { CreateCustomerAddressDto } from '../create-customer_address.dto';
export class CreateProductAdapter
  implements
    IBasePresentationAdapter<
      CustomerAddress,
      CreateCustomerAddressDto.Response
    >
{
  public modelToResponse(
    customerAddress: CreateCustomerAddressDto.Response
  ): CreateCustomerAddressDto.Response {
    return {
      id: customerAddress.id,
      description: customerAddress.description,
      first_name: customerAddress.first_name,
      last_name: customerAddress.last_name,
      company: customerAddress.company,
      street: customerAddress.street,
      number: customerAddress.number,
      complement: customerAddress.complement,
      neighboorhood: customerAddress.neighboorhood,
      city: customerAddress.city,
      state: customerAddress.state,
      country: customerAddress.country,
      postcode: customerAddress.postcode,
      customer_id: customerAddress.customer_id,
      created_at: customerAddress.created_at,
      updated_at: customerAddress.updated_at,
      deleted_at: customerAddress.deleted_at
    };
  }
  public requestToModel() {
    return null;
  }
}
