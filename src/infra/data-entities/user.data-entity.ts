import { User as UserPrisma, Prisma } from '@prisma/client';
import { User, UserEnum } from '../../core/users/entities/user.entity';
export class UserData {
  User;
  static UserDataToEntityMap(UserPrisma): User {
    return {
      id: UserPrisma.id,
      email: UserPrisma.email,
      first_name: UserPrisma.first_name,
      last_name: UserPrisma.last_name,
      role: UserEnum[UserPrisma.role],
      created_at: UserPrisma.created_at,
      updated_at: UserPrisma.updated_at,
      deleted_at: UserPrisma.deleted_at
    };
  }
}

enum RoleEnum {
  USER,
  ADMIN,
  STAFF
}
