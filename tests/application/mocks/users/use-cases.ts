/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable max-classes-per-file */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { AddPageIdToFavoritesByWorkspaceIdInterface } from '@application/interfaces/use-cases/users/AddPageIdToFavoritesByWorkspaceIdInterface';
import { AddWorkspaceByUserIdInterface } from '@application/interfaces/use-cases/users/AddWorkspaceByUserIdInterface';
import { AuthenticateInterface } from '@application/interfaces/use-cases/users/AuthenticateInterface';
import { DeleteUserInterface } from '@application/interfaces/use-cases/users/DeleteUserInterface';
import { GetAccessTokenInterface } from '@application/interfaces/use-cases/users/GetAccessTokenInterface';
import { GetFavoritesByWorkspaceIdInterface } from '@application/interfaces/use-cases/users/GetFavoritesByWorkspaceIdInterface';
import { GetUserByIdInterface } from '@application/interfaces/use-cases/users/GetUserByIdInterface';
import { GetWorkspacesByUserIdInterface } from '@application/interfaces/use-cases/users/GetWorkspacesByUserIdInterface';
import { RemovePageIdFromFavoritesByWorkspaceIdInterface } from '@application/interfaces/use-cases/users/RemovePageIdFromFavoritesByWorkspaceIdInterface';
import { RemoveWorkspaceByUserIdInterface } from '@application/interfaces/use-cases/users/RemoveWorkspaceByUserIdInterface';
import { SignInInterface } from '@application/interfaces/use-cases/users/SignInInterface';
import { SignOutInterface } from '@application/interfaces/use-cases/users/SignOutInterface';
import { SignUpInterface } from '@application/interfaces/use-cases/users/SignUpInterface';
import { UpdateUserInterface } from '@application/interfaces/use-cases/users/UpdateUserInterface';
import { UpdateUserProfilePictureInterface } from '@application/interfaces/use-cases/users/UpdateUserProfilePictureInterface';
import { UpdateUserWorkspaceMetaDataByWorkspaceIdInterface } from '@application/interfaces/use-cases/users/UpdateUserWorkspaceMetaDataByWorkspaceIdInterface';
import mockUser from '@tests/domain/mock-user';

export class AuthenticateStub implements AuthenticateInterface {
  async execute(
    _authenticationToken: string
  ): Promise<AuthenticateInterface.Response> {
    return 'sample_token';
  }
}

export class SignInStub implements SignInInterface {
  async execute(
    _credentials: SignInInterface.Request
  ): Promise<SignInInterface.Response> {
    return {
      accessToken: 'sample-access-token',
      refreshToken: 'sample-refresh-token',
    };
  }
}

export class SignUpStub implements SignUpInterface {
  async execute(
    _userData: SignUpInterface.Request
  ): Promise<SignUpInterface.Response> {
    const { id } = mockUser();
    return id;
  }
}

export class SignOutStub implements SignOutInterface {
  async execute(
    _token: SignOutInterface.Request
  ): Promise<SignOutInterface.Response> {}
}

export class GetAccessTokenStub implements GetAccessTokenInterface {
  async execute(
    _token: GetAccessTokenInterface.Request
  ): Promise<GetAccessTokenInterface.Response> {
    return {
      accessToken: 'sample-access-token',
    };
  }
}

export class GetFavoritesByWorkspaceIdStub
  implements GetFavoritesByWorkspaceIdInterface
{
  async execute(
    _params: GetFavoritesByWorkspaceIdInterface.Request
  ): Promise<GetFavoritesByWorkspaceIdInterface.Response> {
    return ['sample-page-1'];
  }
}

export class GetUserByIdStub implements GetUserByIdInterface {
  async execute(
    _userId: GetUserByIdInterface.Request
  ): Promise<GetUserByIdInterface.Response> {
    const user = mockUser();
    return user;
  }
}

export class GetWorkspacesByUserIdStub
  implements GetWorkspacesByUserIdInterface
{
  async execute(
    _userId: GetWorkspacesByUserIdInterface.Request
  ): Promise<GetWorkspacesByUserIdInterface.Response> {
    return [
      {
        workspaceId: '112233445566778899bbccaa',
        workspaceName: 'sample-name',
        workspaceIcon: '1F3C7',
        favorites: ['sample-page-id'],
      },
    ];
  }
}

export class AddPageIdToFavoritesByWorkspaceIdStub
  implements AddPageIdToFavoritesByWorkspaceIdInterface
{
  async execute(
    _params: AddPageIdToFavoritesByWorkspaceIdInterface.Request
  ): Promise<AddPageIdToFavoritesByWorkspaceIdInterface.Response> {}
}

export class AddWorkspaceByUserIdStub implements AddWorkspaceByUserIdInterface {
  async execute(
    _params: AddWorkspaceByUserIdInterface.Request
  ): Promise<AddWorkspaceByUserIdInterface.Response> {}
}

export class UpdateUserStub implements UpdateUserInterface {
  async execute(
    _params: UpdateUserInterface.Request
  ): Promise<UpdateUserInterface.Response> {
    const user = mockUser();
    return user;
  }
}

export class UpdateUserProfilePictureStub
  implements UpdateUserProfilePictureInterface
{
  async execute(
    params: UpdateUserProfilePictureInterface.Request
  ): Promise<void> {}
}

export class UpdateUserWorkspaceMetaDataByWorkspaceIdStub
  implements UpdateUserWorkspaceMetaDataByWorkspaceIdInterface
{
  async execute(
    params: UpdateUserWorkspaceMetaDataByWorkspaceIdInterface.Request
  ): Promise<UpdateUserWorkspaceMetaDataByWorkspaceIdInterface.Response> {}
}

export class RemovePageIdFromFavoritesByWorkspaceIdStub
  implements RemovePageIdFromFavoritesByWorkspaceIdInterface
{
  async execute(
    _params: RemovePageIdFromFavoritesByWorkspaceIdInterface.Request
  ): Promise<RemovePageIdFromFavoritesByWorkspaceIdInterface.Response> {}
}

export class RemoveWorkspaceByUserIdStub
  implements RemoveWorkspaceByUserIdInterface
{
  async execute(
    _params: RemoveWorkspaceByUserIdInterface.Request
  ): Promise<RemoveWorkspaceByUserIdInterface.Response> {}
}

export class DeleteUserStub implements DeleteUserInterface {
  async execute(
    _userId: DeleteUserInterface.Request
  ): Promise<DeleteUserInterface.Response> {}
}
