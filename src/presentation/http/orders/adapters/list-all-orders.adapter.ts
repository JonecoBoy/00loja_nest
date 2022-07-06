import { Order } from '.prisma/client';
import { IBasePresentationAdapter } from '../../base-presentation.adapter';
import { OrderListDto, OrderListDtoResponseItemType } from '../list-orders.dto';

export class ListAllOrdersAdapter
  implements
    IBasePresentationAdapter<
      Array<Order> | Array<OrderListDtoResponseItemType>,
      OrderListDto.Response
    >
{
  public modelToResponse(
    orders: Array<Order> | Array<OrderListDtoResponseItemType>
  ): OrderListDto.Response {
    const OrderResponse: OrderListDtoResponseItemType[] = [];
    orders.map((order) => {
      const tempOrder: OrderListDtoResponseItemType = {
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
      OrderResponse.push(tempOrder);
    });

    return OrderResponse;
  }
  public requestToModel() {
    return null;
  }
}
