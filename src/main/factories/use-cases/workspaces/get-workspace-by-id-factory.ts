import { GetWorkspaceByIdInterface } from '@application/interfaces/use-cases/workspaces/GetWorkspaceByIdInterface';
import { GetWorkspaceById } from '@application/use-cases/workspaces/GetWorkspaceById';
import { WorkspaceRepository } from '@infrastructure/db/mongodb/repositories/WorkspaceRepository';

export const makeGetWorkspaceById = (): GetWorkspaceByIdInterface => {
  const workspaceRepository = new WorkspaceRepository();

  return new GetWorkspaceById(workspaceRepository);
};
