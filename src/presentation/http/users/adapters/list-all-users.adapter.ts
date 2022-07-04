import { User } from 'src/core/users/user';
import { Role } from 'src/presentation/auth/roles/role.enum';
import { IBasePresentationAdapter } from '../../base-presentation.adapter';
import { UserListDto, UserListDtoResponseItemType } from '../list-user.dto';
export class ListAllUsersAdapter
  implements IBasePresentationAdapter<Array<User>, UserListDto.Response>
{
  public modelToResponse(users: Array<User>): UserListDto.Response {
    const UsersResponse: UserListDtoResponseItemType[] = [];
    users.map((user) => {
      const tempUser: UserListDtoResponseItemType = {
        id: user.id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        roles: user.roles,
        created_at: user.created_at,
        updated_at: user.updated_at,
        deleted_at: user.deleted_at
      };
      UsersResponse.push(tempUser);
    });

    return UsersResponse;
  }
  public requestToModel() {
    return null;
  }
}
