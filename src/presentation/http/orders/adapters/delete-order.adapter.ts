import { Order } from '.prisma/client';
import { Customer } from 'src/core/customers/customer';
import { IBasePresentationAdapter } from '../../base-presentation.adapter';
import { DeleteOrderDto } from '../delete-order.dto';
export class DeleteOrderAdapter
  implements IBasePresentationAdapter<Order, DeleteOrderDto.Response>
{
  public modelToResponse(order: Order): DeleteOrderDto.Response {
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
