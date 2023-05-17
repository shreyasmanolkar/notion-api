/* eslint-disable max-classes-per-file */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { AddPageIdToFavoritesByWorkspaceIdRepository } from '@application/interfaces/repositories/users/addPageIdToFavoritesByWorkspaceIdRepository';
import { AddWorkspaceByUserIdRepository } from '@application/interfaces/repositories/users/addWorkspaceByUserIdRepository';
import { CreateUserRepository } from '@application/interfaces/repositories/users/createUserRepository';
import { DeleteUserRepository } from '@application/interfaces/repositories/users/deleteUserRepository';
import { GetFavoritesByWorkspaceIdRepository } from '@application/interfaces/repositories/users/getFavoritesByWorkspaceIdRepository';
import { GetUserByIdRepository } from '@application/interfaces/repositories/users/getUserByIdRepository';
import { GetWorkspacesByUserIdRepository } from '@application/interfaces/repositories/users/getWorkspacesByUserIdRepository';
import { LoadUserByEmailRepository } from '@application/interfaces/repositories/users/loadUserByEmailRepository';
import { RemovePageIdFromFavoritesByWorkspaceIdRepository } from '@application/interfaces/repositories/users/removePageIdFromFavoritesByWorkspaceIdRepository';
import { RemoveWorkspaceByUserIdRepository } from '@application/interfaces/repositories/users/removeWorkspaceByUserIdRepository';
import { UpdateUserProfilePictureRepository } from '@application/interfaces/repositories/users/updateUserProfilePictureRepository';
import { UpdateUserRepository } from '@application/interfaces/repositories/users/updateUserRepository';
import mockUser from '@tests/domain/mock-user';

export class CreateUserRepositoryStub implements CreateUserRepository {
  async createUser(
    _userData: CreateUserRepository.Request
  ): Promise<CreateUserRepository.Response> {
    const { id } = mockUser();
    return id;
  }
}

export class addWorkspaceByUserIdRepositoryStub
  implements AddWorkspaceByUserIdRepository
{
  async addWorkspaceByUserId(
    _params: AddWorkspaceByUserIdRepository.Request
  ): Promise<AddWorkspaceByUserIdRepository.Response> {
    return mockUser();
  }
}

export class addPageIdToFavoritesByWorkspaceIdRepositoryStub
  implements AddPageIdToFavoritesByWorkspaceIdRepository
{
  async addPageIdToFavoritesByWorkspaceId(
    _params: AddPageIdToFavoritesByWorkspaceIdRepository.Request
  ): Promise<AddPageIdToFavoritesByWorkspaceIdRepository.Response> {
    return mockUser();
  }
}

export class loadUserByEmail implements LoadUserByEmailRepository {
  async loadUserByEmail(
    _email: LoadUserByEmailRepository.Request
  ): Promise<LoadUserByEmailRepository.Response> {
    return mockUser();
  }
}

export class getUserByIdRepositoryStub implements GetUserByIdRepository {
  async getUserById(
    _userId: GetUserByIdRepository.Request
  ): Promise<GetUserByIdRepository.Response> {
    return mockUser();
  }
}

export class getWorkspacesByUserIdRepositoryStub
  implements GetWorkspacesByUserIdRepository
{
  async getWorkspacesByUserId(
    _userId: GetWorkspacesByUserIdRepository.Request
  ): Promise<GetWorkspacesByUserIdRepository.Response> {
    const { workspaces } = mockUser();
    return workspaces;
  }
}

export class getFavoritesByWorkspaceIdRepositoryStub
  implements GetFavoritesByWorkspaceIdRepository
{
  async getFavoritesByWorkspaceId(
    _params: GetFavoritesByWorkspaceIdRepository.Request
  ): Promise<GetFavoritesByWorkspaceIdRepository.Response> {
    const { workspaces } = mockUser();
    const { favorites } = workspaces[0];
    return favorites;
  }
}

export class updateUserRepositoryStub implements UpdateUserRepository {
  async updateUser(
    _params: UpdateUserRepository.Request
  ): Promise<UpdateUserRepository.Response> {
    return mockUser();
  }
}

export class updateUserProfilePictureRepositoryStub
  implements UpdateUserProfilePictureRepository
{
  async updateUserProfilePicture(
    _params: UpdateUserProfilePictureRepository.Request
  ): Promise<UpdateUserProfilePictureRepository.Response> {
    return mockUser();
  }
}

export class removeWorkspaceByUserIdRepositoryStub
  implements RemoveWorkspaceByUserIdRepository
{
  async removeWorkspaceByUserId(
    params: RemoveWorkspaceByUserIdRepository.Request
  ): Promise<RemoveWorkspaceByUserIdRepository.Response> {
    return mockUser();
  }
}

export class removePageIdFromFavoritesByWorkspaceIdRepositoryStub
  implements RemovePageIdFromFavoritesByWorkspaceIdRepository
{
  async removePageIdFromFavoritesByWorkspaceId(
    params: RemovePageIdFromFavoritesByWorkspaceIdRepository.Request
  ): Promise<RemovePageIdFromFavoritesByWorkspaceIdRepository.Response> {
    return mockUser();
  }
}

export class deleteUserRepositoryStub implements DeleteUserRepository {
  async deleteUser(
    userId: DeleteUserRepository.Request
    // eslint-disable-next-line @typescript-eslint/no-empty-function
  ): Promise<DeleteUserRepository.Response> {}
}
