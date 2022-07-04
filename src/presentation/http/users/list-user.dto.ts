import { ResultError } from 'src/presentation/error/result.error';
import { Role } from '@prisma/client';
import { User } from 'src/core/users/user';

export type UserListDtoResponseItemType = {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  roles?: Role[];
  created_at?: Date | null;
  updated_at?: Date | null;
  deleted_at?: Date | null;
};

// export type UserListDtoResponseType = UserListDtoResponseItemType[];

export namespace UserListDto {
  export type Response = UserListDtoResponseItemType[] | ResultError;
}
