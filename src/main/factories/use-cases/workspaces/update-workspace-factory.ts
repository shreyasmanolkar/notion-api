import { UpdateWorkspaceInterface } from '@application/interfaces/use-cases/workspaces/UpdateWorkspaceInterface';
import { UpdateWorkspace } from '@application/use-cases/workspaces/UpdateWorkspace';
import { WorkspaceRepository } from '@infrastructure/db/mongodb/repositories/WorkspaceRepository';

export const makeUpdateWorkspace = (): UpdateWorkspaceInterface => {
  const workspaceRepository = new WorkspaceRepository();

  return new UpdateWorkspace(workspaceRepository, workspaceRepository);
};
