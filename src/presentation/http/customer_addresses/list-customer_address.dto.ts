import { ResultError } from 'src/presentation/error/result.error';

export type CustomerAddressListDtoResponseItemType = {
  id: string;
  description: string;
  first_name: string;
  last_name: string;
  company?: string;
  street: string;
  number: number;
  complement: string;
  neighboorhood: string;
  city: string;
  state: string;
  country: string;
  postcode: string;
  customer_id: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
};

// export type UserListDtoResponseType = UserListDtoResponseItemType[];

export namespace CustomerAddressListDto {
  export type Response = CustomerAddressListDtoResponseItemType[] | ResultError;
}
