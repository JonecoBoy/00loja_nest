import { ResultError } from 'src/presentation/error/result.error';
import { Role } from '@prisma/client';
type UserListDtoResponseItemType = {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  role?: Role;
  created_at?: Date | null;
  updated_at?: Date | null;
  deletedAt?: Date | null;
};

type UserListDtoResponseType = {
  data: UserListDtoResponseItemType[];
};

export namespace UserListDto {
  export type Response = UserListDtoResponseItemType | ResultError;
}
