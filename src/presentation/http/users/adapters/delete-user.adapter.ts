import { User } from 'src/core/users/user';
import { Role } from 'src/presentation/auth/roles/role.enum';
import { IBasePresentationAdapter } from '../../base-presentation.adapter';
import { DeleteUserDto } from '../delete-user.dto';
export class DeleteUserAdapter
  implements IBasePresentationAdapter<User, DeleteUserDto.Response>
{
  public modelToResponse(user: User): DeleteUserDto.Response {
    return {
      id: user.id,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      roles: user.roles,
      created_at: user.created_at,
      updated_at: user.updated_at,
      deleted_at: user.deleted_at
    };
  }
  public requestToModel() {
    return null;
  }
}
