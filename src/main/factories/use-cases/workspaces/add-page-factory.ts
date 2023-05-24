import { AddPageInterface } from '@application/interfaces/use-cases/workspaces/AddPageInterface';
import { AddPage } from '@application/use-cases/workspaces/AddPage';
import { WorkspaceRepository } from '@infrastructure/db/mongodb/repositories/WorkspaceRepository';

export const makeAddPage = (): AddPageInterface => {
  const workspaceRepository = new WorkspaceRepository();

  return new AddPage(workspaceRepository, workspaceRepository);
};
