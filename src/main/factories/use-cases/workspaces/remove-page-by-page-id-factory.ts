import { RemovePageByPageIdInterface } from '@application/interfaces/use-cases/workspaces/RemovePageByPageIdInterface';
import { RemovePageByPageId } from '@application/use-cases/workspaces/RemovePageByPageId';
import { WorkspaceRepository } from '@infrastructure/db/mongodb/repositories/WorkspaceRepository';

export const makeRemovePageByPageId = (): RemovePageByPageIdInterface => {
  const workspaceRepository = new WorkspaceRepository();

  return new RemovePageByPageId(workspaceRepository, workspaceRepository);
};
