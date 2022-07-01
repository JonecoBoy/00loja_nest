import { Role } from '@prisma/client';

export class User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  role: UserEnum;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
}

export enum UserEnum {
  ADMIN = 'ADMIN',
  USER = 'USER',
  STAFF = 'STAFF'
}
