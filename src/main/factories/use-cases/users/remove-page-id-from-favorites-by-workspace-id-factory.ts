import { RemovePageIdFromFavoritesByWorkspaceIdInterface } from '@application/interfaces/use-cases/users/RemovePageIdFromFavoritesByWorkspaceIdInterface';
import { RemovePageIdFromFavoritesByWorkspaceId } from '@application/use-cases/users/RemovePageIdFromFavoritesByWorkspaceId';
import { UserRepository } from '@infrastructure/db/mongodb/repositories/UserRepository';

export const makeRemovePageIdFromFavoritesByWorkspaceId =
  (): RemovePageIdFromFavoritesByWorkspaceIdInterface => {
    const userRepository = new UserRepository();

    return new RemovePageIdFromFavoritesByWorkspaceId(
      userRepository,
      userRepository
    );
  };
