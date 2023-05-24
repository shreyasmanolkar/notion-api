import { CreateWorkspaceInterface } from '@application/interfaces/use-cases/workspaces/CreateWorkspaceInterface';
import { CreateWorkspace } from '@application/use-cases/workspaces/CreateWorkspace';
import { WorkspaceRepository } from '@infrastructure/db/mongodb/repositories/WorkspaceRepository';

export const makeCreateWorkspace = (): CreateWorkspaceInterface => {
  const workspaceRepository = new WorkspaceRepository();

  return new CreateWorkspace(workspaceRepository);
};
