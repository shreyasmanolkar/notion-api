import { RemoveWorkspaceByUserIdInterface } from '@application/interfaces/use-cases/users/RemoveWorkspaceByUserIdInterface';
import { RemoveWorkspaceByUserId } from '@application/use-cases/users/RemoveWorkspaceByUserId';
import { UserRepository } from '@infrastructure/db/mongodb/repositories/UserRepository';

export const makeRemoveWorkspaceByUserId =
  (): RemoveWorkspaceByUserIdInterface => {
    const userRepository = new UserRepository();

    return new RemoveWorkspaceByUserId(userRepository);
  };
