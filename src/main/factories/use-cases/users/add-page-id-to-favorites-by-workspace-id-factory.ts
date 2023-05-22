import { AddPageIdToFavoritesByWorkspaceIdInterface } from '@application/interfaces/use-cases/users/AddPageIdToFavoritesByWorkspaceIdInterface';
import { AddPageIdToFavoritesByWorkspaceId } from '@application/use-cases/users/AddPageIdToFavoritesByWorkspaceId';
import { UserRepository } from '@infrastructure/db/mongodb/repositories/UserRepository';

export const makeAddPageIdToFavoritesByWorkspaceId =
  (): AddPageIdToFavoritesByWorkspaceIdInterface => {
    const userRepository = new UserRepository();

    return new AddPageIdToFavoritesByWorkspaceId(
      userRepository,
      userRepository
    );
  };
