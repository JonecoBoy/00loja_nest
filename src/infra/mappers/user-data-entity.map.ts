import { User as UserPrisma } from '@prisma/client';
import { User as UserEntity } from '../../core/users/entities/user.entity';
export class UserDataEntityMap {
  static DataToEntity(input: UserPrisma): UserEntity {
    return {
      id: input.id,
      email: input.email,
      first_name: input.first_name,
      last_name: input.last_name,
      role: null,
      created_at: input.created_at,
      updated_at: input.updated_at,
      deleted_at: input.deleted_at
    };
  }

  static EntityToData(UserEntity): UserPrisma {
    return null;
  }
}
