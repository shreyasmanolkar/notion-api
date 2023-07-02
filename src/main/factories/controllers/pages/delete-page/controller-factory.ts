import { BaseController } from '@infrastructure/http/controllers/BaseController';
import { DeletePageController } from '@infrastructure/http/controllers/pages/DeletePageController';
import { makeDeletePage } from '@main/factories/use-cases/pages/delete-page-factory';
import { makeGetPageById } from '@main/factories/use-cases/pages/get-page-by-id-factory';
import { makeRemovePageIdFromFavoritesByWorkspaceId } from '@main/factories/use-cases/users/remove-page-id-from-favorites-by-workspace-id-factory';
import { makeGetWorkspaceById } from '@main/factories/use-cases/workspaces/get-workspace-by-id-factory';
import { makeRemovePageByPageId } from '@main/factories/use-cases/workspaces/remove-page-by-page-id-factory';

export const makeDeletePageController = (): BaseController => {
  const getPageByIdUseCase = makeGetPageById();
  const deletePageUseCase = makeDeletePage();
  const removePageByPageIdUseCase = makeRemovePageByPageId();
  const getWorkspaceByIdUseCase = makeGetWorkspaceById();
  const removePageIdFromFavoritesByWorkspaceIdUseCase =
    makeRemovePageIdFromFavoritesByWorkspaceId();

  return new DeletePageController(
    getPageByIdUseCase,
    deletePageUseCase,
    removePageByPageIdUseCase,
    getWorkspaceByIdUseCase,
    removePageIdFromFavoritesByWorkspaceIdUseCase
  );
};
