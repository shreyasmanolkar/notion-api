import { BaseController } from '@infrastructure/http/controllers/BaseController';
import { RemovePageByPageIdController } from '@infrastructure/http/controllers/workspaces/RemovePageByPageIdController';
import { makeGetWorkspaceById } from '@main/factories/use-cases/workspaces/get-workspace-by-id-factory';
import { makeRemovePageByPageId } from '@main/factories/use-cases/workspaces/remove-page-by-page-id-factory';

export const makeRemovePageByPageIdController = (): BaseController => {
  const getWorkspaceByIdUseCase = makeGetWorkspaceById();
  const removePageByPageIdUseCase = makeRemovePageByPageId();

  return new RemovePageByPageIdController(
    getWorkspaceByIdUseCase,
    removePageByPageIdUseCase
  );
};
