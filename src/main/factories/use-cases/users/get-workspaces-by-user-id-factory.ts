import { GetWorkspacesByUserIdInterface } from '@application/interfaces/use-cases/users/GetWorkspacesByUserIdInterface';
import { GetWorkspacesByUserId } from '@application/use-cases/users/GetWorkspacesByUserId';
import { UserRepository } from '@infrastructure/db/mongodb/repositories/UserRepository';

export const makeGetWorkspacesByUserId = (): GetWorkspacesByUserIdInterface => {
  const userRepository = new UserRepository();

  return new GetWorkspacesByUserId(userRepository);
};
