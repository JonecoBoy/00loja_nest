import { CustomerAddress } from '.prisma/client';
import { IBasePresentationAdapter } from '../../base-presentation.adapter';
import {
  CustomerAddressListDto,
  CustomerAddressListDtoResponseItemType
} from '../list-customer_address.dto';
export class ListAllCustomerAddressesAdapter
  implements
    IBasePresentationAdapter<
      Array<CustomerAddress> | Array<CustomerAddressListDtoResponseItemType>,
      CustomerAddressListDto.Response
    >
{
  public modelToResponse(
    customerAddresses:
      | Array<CustomerAddress>
      | Array<CustomerAddressListDtoResponseItemType>
  ): CustomerAddressListDto.Response {
    const CustomerAddressResponse: CustomerAddressListDtoResponseItemType[] =
      [];
    customerAddresses.map((customerAddress) => {
      const tempCustomerAddress: CustomerAddressListDtoResponseItemType = {
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
      CustomerAddressResponse.push(tempCustomerAddress);
    });

    return CustomerAddressResponse;
  }
  public requestToModel() {
    return null;
  }
}
