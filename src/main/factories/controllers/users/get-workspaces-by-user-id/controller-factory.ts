import { BaseController } from '@infrastructure/http/controllers/BaseController';
import { GetWorkspacesByUserIdController } from '@infrastructure/http/controllers/users/GetWorkspacesByUserIdController';
import { makeGetWorkspacesByUserId } from '@main/factories/use-cases/users/get-workspaces-by-user-id-factory';

export const makeGetWorkspacesByUserIdController = (): BaseController => {
  const getWorkspacesByUserIdUseCase = makeGetWorkspacesByUserId();

  return new GetWorkspacesByUserIdController(getWorkspacesByUserIdUseCase);
};
