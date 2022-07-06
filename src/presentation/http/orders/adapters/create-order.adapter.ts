import { Order } from 'src/core/orders/order';
import { IBasePresentationAdapter } from '../../base-presentation.adapter';
import { CreateOrderDto } from '../create-order.dto';
export class CreateOrderAdapter
  implements IBasePresentationAdapter<Order, CreateOrderDto.Response>
{
  public modelToResponse(
    order: CreateOrderDto.Response & Order
  ): CreateOrderDto.Response {
    return {
      id: order.id,
      comment: order.comment,
      products: order.products,
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
