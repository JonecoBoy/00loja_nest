import { Order } from 'src/core/orders/order';
import { IBasePresentationAdapter } from '../../base-presentation.adapter';
import { UpdateOrderDto } from '../update-order.dto';
export class UpdateOrderAdapter
  implements
    IBasePresentationAdapter<UpdateOrderDto.Response, UpdateOrderDto.Response>
{
  public modelToResponse(
    order: UpdateOrderDto.Response
  ): UpdateOrderDto.Response {
    return {
      id: order.id,
      comment: order.comment,
      products: order.products,
      customer_id: order.customer_id,
      customer_address_id: order.customer_address_id,
      customer: order.customer,
      customer_address: order.customer_address,
      created_at: order.created_at,
      updated_at: order.updated_at,
      deleted_at: order.deleted_at
    };
  }
  public requestToModel() {
    return null;
  }
}
