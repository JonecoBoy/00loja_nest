import { ResultError } from 'src/presentation/error/result.error';
import { Role } from '@prisma/client';
import { User } from 'src/core/users/user';

export type ProductCategoryListDtoResponseItemType = {
  id: string;
  name: string;
  description: string;
  slug: string;
  main_category: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
};

// export type UserListDtoResponseType = UserListDtoResponseItemType[];

export namespace ProductCategoryListDto {
  export type Response = ProductCategoryListDtoResponseItemType[] | ResultError;
}
