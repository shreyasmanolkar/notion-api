import { BaseController } from '@infrastructure/http/controllers/BaseController';
import { makeCreatePageValidation } from '@main/factories/controllers/pages/create-page/validation-factory';
import { makeCreatePage } from '@main/factories/use-cases/pages/create-page-factory';
import { CreatePageController } from '@infrastructure/http/controllers/pages/CreatePageController';
import { makeGetPageById } from '@main/factories/use-cases/pages/get-page-by-id-factory';
import { makeAddPage } from '@main/factories/use-cases/workspaces/add-page-factory';
import { makeAddPageIdToFavoritesByWorkspaceId } from '@main/factories/use-cases/users/add-page-id-to-favorites-by-workspace-id-factory';

export const makeCreatePageController = (): BaseController => {
  const validation = makeCreatePageValidation();
  const createPageUseCase = makeCreatePage();
  const getPageByIdUseCase = makeGetPageById();
  const addPageUseCase = makeAddPage();
  const addPageIdToFavoritesByWorkspaceIdUseCase =
    makeAddPageIdToFavoritesByWorkspaceId();

  return new CreatePageController(
    validation,
    createPageUseCase,
    getPageByIdUseCase,
    addPageUseCase,
    addPageIdToFavoritesByWorkspaceIdUseCase
  );
};
