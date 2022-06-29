import { User as UserType, Role, Prisma } from '@prisma/client';
import { UserData } from 'src/infra/data-entities/user.data-entity';

export class User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  role: Role;
  created_at: Date;
  updated_at: Date;
  deletedAt?: Date;

  static toEntity(User): UserData {
    const result = {
      id: User.id,
      email: User.email,
      first_name: User.first_name,
      last_name: User.last_name,
      role: User.role,
      created_at: User.created_at,
      updated_at: User.updated_at,
      deletedAt: User.deletedAt
    };
    return result;
  }

  static toDataEntity(UserData): User {
    const result = {
      id: UserData.id,
      email: UserData.email,
      first_name: UserData.first_name,
      last_name: UserData.last_name,
      role: UserData.role,
      created_at: UserData.created_at,
      updated_at: UserData.updated_at,
      deletedAt: UserData.deletedAt
    };
    return result;
  }
}
