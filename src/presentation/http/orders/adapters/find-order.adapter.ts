import { Customer } from 'src/core/customers/customer';
import { Order } from 'src/core/orders/order';
import { IBasePresentationAdapter } from '../../base-presentation.adapter';
import { FindOrderDto } from '../find-order.dto';
export class FindOrderAdapter
  implements
    IBasePresentationAdapter<
      Order | FindOrderDto.Response,
      FindOrderDto.Response
    >
{
  public modelToResponse(
    order: FindOrderDto.Response | Order
  ): FindOrderDto.Response {
    return {
      id: order.id,
      comment: order.comment,
      products: null,
      customer_id: order.customer_id,
      customer_address_id: order.customer_address_id,
      created_at: order.created_at,
      updated_at: order.updated_at,
      deleted_at: order.deleted_at
    };
  }
  public requestToModel() {
    return null;
  }
}
