import { BaseController } from '@infrastructure/http/controllers/BaseController';
import { AddWorkspaceByUserIdController } from '@infrastructure/http/controllers/users/AddWorkspaceByUserIdController';
import { makeAddWorkspaceByUserId } from '@main/factories/use-cases/users/add-workspace-by-user-id-factory';
import { makeGetUserById } from '@main/factories/use-cases/users/get-user-by-id-factory';

export const makeAddWorkspaceByUserIdController = (): BaseController => {
  const getUserByIdUseCase = makeGetUserById();
  const addWorkspaceByUserIdUseCase = makeAddWorkspaceByUserId();

  return new AddWorkspaceByUserIdController(
    getUserByIdUseCase,
    addWorkspaceByUserIdUseCase
  );
};
