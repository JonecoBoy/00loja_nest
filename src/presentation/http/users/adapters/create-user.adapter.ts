import { User } from 'src/core/users/user';
import { IBasePresentationAdapter } from '../../base-presentation.adapter';
import { CreateUserDto } from '../create-user.dto';
export class CreateUserAdapter
  implements IBasePresentationAdapter<User, CreateUserDto.Response>
{
  public modelToResponse(user: User): CreateUserDto.Response {
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
