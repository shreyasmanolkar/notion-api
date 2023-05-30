import { BaseController } from '@infrastructure/http/controllers/BaseController';
import { CreateWorkspaceController } from '@infrastructure/http/controllers/workspaces/CreateWorkspaceController';
import { makeCreateWorkspace } from '@main/factories/use-cases/workspaces/create-workspace-factory';
import { makeCreateWorkspaceValidation } from '@main/factories/controllers/workspaces/create-workspace/validation-factory';
import { makeCreatePage } from '@main/factories/use-cases/pages/create-page-factory';
import { makeGetPageById } from '@main/factories/use-cases/pages/get-page-by-id-factory';
import { makeAddPage } from '@main/factories/use-cases/workspaces/add-page-factory';
import { makeAddWorkspaceByUserId } from '@main/factories/use-cases/users/add-workspace-by-user-id-factory';

export const makeCreateWorkspaceController = (): BaseController => {
  const validation = makeCreateWorkspaceValidation();
  const createWorkspaceUseCase = makeCreateWorkspace();
  const createPageUseCase = makeCreatePage();
  const getPageByIdUseCase = makeGetPageById();
  const addPageUseCase = makeAddPage();
  const addWorkspaceByUserIdUseCase = makeAddWorkspaceByUserId();

  return new CreateWorkspaceController(
    validation,
    createWorkspaceUseCase,
    createPageUseCase,
    getPageByIdUseCase,
    addPageUseCase,
    addWorkspaceByUserIdUseCase
  );
};
