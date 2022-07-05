import { Product } from 'src/core/products/product';
import { IBasePresentationAdapter } from '../../base-presentation.adapter';
import {
  ProductListDto,
  ProductListDtoResponseItemType
} from '../list-product.dto';
export class ListAllProductsAdapter
  implements IBasePresentationAdapter<Array<Product>, ProductListDto.Response>
{
  public modelToResponse(users: Array<Product>): ProductListDto.Response {
    const ProductsResponse: ProductListDtoResponseItemType[] = [];
    users.map((product) => {
      const tempProduct: ProductListDtoResponseItemType = {
        id: product.id,
        name: product.name,
        description: product.description,
        slug: product.slug,
        sku: product.sku,
        price: product.price,
        weight_unit: product.weight_unit,
        weight: product.weight,
        length_unit: product.length_unit,
        lengt: product.length,
        width: product.width,
        height: product.height,
        minimum_amount: product.minimum_amount,
        created_at: product.created_at,
        updated_at: product.updated_at,
        deleted_at: product.deleted_at
      };
      ProductsResponse.push(tempProduct);
    });

    return ProductsResponse;
  }
  public requestToModel() {
    return null;
  }
}
