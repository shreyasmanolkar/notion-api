import { DeleteWorkspaceInterface } from '@application/interfaces/use-cases/workspaces/DeleteWorkspaceInterface';
import { DeleteWorkspace } from '@application/use-cases/workspaces/DeleteWorkspace';
import { WorkspaceRepository } from '@infrastructure/db/mongodb/repositories/WorkspaceRepository';

export const makeDeleteWorkspace = (): DeleteWorkspaceInterface => {
  const workspaceRepository = new WorkspaceRepository();

  return new DeleteWorkspace(workspaceRepository);
};
