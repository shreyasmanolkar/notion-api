import { GetFavoritesByWorkspaceIdInterface } from '@application/interfaces/use-cases/users/GetFavoritesByWorkspaceIdInterface';
import { GetFavoritesByWorkspaceId } from '@application/use-cases/users/GetFavoritesByWorkspaceId';
import { UserRepository } from '@infrastructure/db/mongodb/repositories/UserRepository';

export const makeGetFavoritesByWorkspaceId =
  (): GetFavoritesByWorkspaceIdInterface => {
    const userRepository = new UserRepository();

    return new GetFavoritesByWorkspaceId(userRepository, userRepository);
  };
