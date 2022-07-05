import { ResultError } from 'src/presentation/error/result.error';
import { WeightUnit, LengthUnit } from '@prisma/client';

export type ProductListDtoResponseItemType = {
  id: string;
  name: string;
  description: string;
  slug: string;
  sku: string;
  price: number;
  weight_unit: string;
  weight: number;
  length_unit: LengthUnit;
  lengt: number;
  width: number;
  height: number;
  minimum_amount: number;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
};

// export type UserListDtoResponseType = UserListDtoResponseItemType[];

export namespace ProductListDto {
  export type Response = ProductListDtoResponseItemType[] | ResultError;
}
