import { BaseController } from '@infrastructure/http/controllers/BaseController';
import { DeletePagesByWorkspaceIdController } from '@infrastructure/http/controllers/pages/DeletePagesByWorkspaceIdController';
import { makeDeletePagesByWorkspaceId } from '@main/factories/use-cases/pages/delete-pages-by-workspace-id-factory';
import { makeGetWorkspaceById } from '@main/factories/use-cases/workspaces/get-workspace-by-id-factory';

export const makeDeletePagesByWorkspaceIdController = (): BaseController => {
  const getWorkspaceByIdUseCase = makeGetWorkspaceById();
  const deletePagesByWorkspaceIdUseCase = makeDeletePagesByWorkspaceId();

  return new DeletePagesByWorkspaceIdController(
    getWorkspaceByIdUseCase,
    deletePagesByWorkspaceIdUseCase
  );
};
