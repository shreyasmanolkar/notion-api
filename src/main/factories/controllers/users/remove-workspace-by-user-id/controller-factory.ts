import { BaseController } from '@infrastructure/http/controllers/BaseController';
import { RemoveWorkspaceByUserIdController } from '@infrastructure/http/controllers/users/RemoveWorkspaceByUserIdController';
import { makeGetWorkspacesByUserId } from '@main/factories/use-cases/users/get-workspaces-by-user-id-factory';
import { makeRemoveWorkspaceByUserId } from '@main/factories/use-cases/users/remove-workspace-by-user-id-factory';

export const makeRemoveWorkspaceByUserIdController = (): BaseController => {
  const getWorkspacesByUserIdUseCase = makeGetWorkspacesByUserId();
  const removeWorkspaceByUserIdUseCase = makeRemoveWorkspaceByUserId();

  return new RemoveWorkspaceByUserIdController(
    getWorkspacesByUserIdUseCase,
    removeWorkspaceByUserIdUseCase
  );
};
