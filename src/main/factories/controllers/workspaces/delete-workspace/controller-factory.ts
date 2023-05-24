import { BaseController } from '@infrastructure/http/controllers/BaseController';
import { DeleteWorkspaceController } from '@infrastructure/http/controllers/workspaces/DeleteWorkspaceController';
import { makeDeleteWorkspace } from '@main/factories/use-cases/workspaces/delete-workspace-factory';
import { makeGetWorkspaceById } from '@main/factories/use-cases/workspaces/get-workspace-by-id-factory';

export const makeDeleteWorkspaceController = (): BaseController => {
  const getWorkspaceByIdUseCase = makeGetWorkspaceById();
  const deleteWorkspaceUseCase = makeDeleteWorkspace();

  return new DeleteWorkspaceController(
    getWorkspaceByIdUseCase,
    deleteWorkspaceUseCase
  );
};
