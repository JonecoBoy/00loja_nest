import { Product } from 'src/core/products/product';
import { IBasePresentationAdapter } from '../../base-presentation.adapter';
import { CreateProductDto } from '../create-product.dto';
export class CreateProductAdapter
  implements IBasePresentationAdapter<Product, CreateProductDto.Response>
{
  public modelToResponse(product: Product): CreateProductDto.Response {
    return {
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
  }
  public requestToModel() {
    return null;
  }
}
