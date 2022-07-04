import { User } from 'src/core/users/user';
import { IBasePresentationAdapter } from '../../base-presentation.adapter';
import { UpdateUserDto } from '../update-user.dto';
export class UpdateUserAdapter
  implements IBasePresentationAdapter<User, UpdateUserDto.Response>
{
  public modelToResponse(user: User): UpdateUserDto.Response {
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
