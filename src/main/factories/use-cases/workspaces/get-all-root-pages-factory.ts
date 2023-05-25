import { GetAllRootPagesInterface } from '@application/interfaces/use-cases/workspaces/GetAllRootPagesInterface';
import { GetAllRootPages } from '@application/use-cases/workspaces/GetAllRootPages';
import { WorkspaceRepository } from '@infrastructure/db/mongodb/repositories/WorkspaceRepository';

export const makeGetAllRootPages = (): GetAllRootPagesInterface => {
  const workspaceRepository = new WorkspaceRepository();

  return new GetAllRootPages(workspaceRepository, workspaceRepository);
};
