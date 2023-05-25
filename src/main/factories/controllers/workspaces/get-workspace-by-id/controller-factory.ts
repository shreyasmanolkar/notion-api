import { BaseController } from '@infrastructure/http/controllers/BaseController';
import { GetWorkspaceByIdController } from '@infrastructure/http/controllers/workspaces/GetWorkspaceByIdController';
import { makeGetWorkspaceById } from '@main/factories/use-cases/workspaces/get-workspace-by-id-factory';

export const makeGetWorkspaceByIdController = (): BaseController => {
  const getWorkspaceByIdUseCase = makeGetWorkspaceById();

  return new GetWorkspaceByIdController(getWorkspaceByIdUseCase);
};
