import { AddWorkspaceByUserIdInterface } from '@application/interfaces/use-cases/users/AddWorkspaceByUserIdInterface';
import { AddWorkspaceByUserId } from '@application/use-cases/users/AddWorkspaceByUserId';
import { UserRepository } from '@infrastructure/db/mongodb/repositories/UserRepository';

export const makeAddWorkspaceByUserId = (): AddWorkspaceByUserIdInterface => {
  const userRepository = new UserRepository();

  return new AddWorkspaceByUserId(userRepository, userRepository);
};
