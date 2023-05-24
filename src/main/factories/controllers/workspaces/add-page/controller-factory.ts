import { BaseController } from '@infrastructure/http/controllers/BaseController';
import { AddPageController } from '@infrastructure/http/controllers/workspaces/AddPageController';
import { makeAddPage } from '@main/factories/use-cases/workspaces/add-page-factory';
import { makeGetWorkspaceById } from '@main/factories/use-cases/workspaces/get-workspace-by-id-factory';
import { makeAddPageValidation } from '@main/factories/controllers/workspaces/add-page/validation-factory';

export const makeAddPageController = (): BaseController => {
  const validation = makeAddPageValidation();
  const getWorkspaceByIdUseCase = makeGetWorkspaceById();
  const addPageUseCase = makeAddPage();

  return new AddPageController(
    validation,
    getWorkspaceByIdUseCase,
    addPageUseCase
  );
};
