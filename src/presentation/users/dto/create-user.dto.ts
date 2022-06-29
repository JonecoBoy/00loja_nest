export class CreateUserDto {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  role: RoleEnum;
}

enum RoleEnum {
  ADMIN,
  USER,
  STAFF
}
