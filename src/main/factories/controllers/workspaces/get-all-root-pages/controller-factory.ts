import { BaseController } from '@infrastructure/http/controllers/BaseController';
import { GetAllRootPagesController } from '@infrastructure/http/controllers/workspaces/GetAllRootPagesController';
import { makeGetAllRootPages } from '@main/factories/use-cases/workspaces/get-all-root-pages-factory';
import { makeGetWorkspaceById } from '@main/factories/use-cases/workspaces/get-workspace-by-id-factory';

export const makeGetAllRootPagesController = (): BaseController => {
  const getWorkspaceByIdUseCase = makeGetWorkspaceById();
  const getAllRootPagesUseCase = makeGetAllRootPages();

  return new GetAllRootPagesController(
    getWorkspaceByIdUseCase,
    getAllRootPagesUseCase
  );
};
