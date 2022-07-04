import { User } from 'src/core/users/user';
import { Role } from 'src/presentation/auth/roles/role.enum';
import { IBasePresentationAdapter } from '../../base-presentation.adapter';
import { FindUserDto } from '../find-user.dto';
import { UserListDto, UserListDtoResponseItemType } from '../list-user.dto';
export class GetUserAdapter
  implements IBasePresentationAdapter<User, FindUserDto.Response>
{
  public modelToResponse(user: User): FindUserDto.Response {
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
