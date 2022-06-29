export class UserData {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  role: RoleEnum;
  created_at: string;
  updated_at: string;
  deletedAt?: string;
}

enum RoleEnum {
  USER,
  ADMIN,
  STAFF
}
