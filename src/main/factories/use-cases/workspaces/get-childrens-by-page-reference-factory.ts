import { GetChildrensByPageReferenceInterface } from '@application/interfaces/use-cases/workspaces/GetChildrensByPageReferenceInterface';
import { GetChildrensByPageReference } from '@application/use-cases/workspaces/GetChildrensByPageReference';
import { WorkspaceRepository } from '@infrastructure/db/mongodb/repositories/WorkspaceRepository';

export const makeGetChildrensByPageReference =
  (): GetChildrensByPageReferenceInterface => {
    const workspaceRepository = new WorkspaceRepository();

    return new GetChildrensByPageReference(
      workspaceRepository,
      workspaceRepository
    );
  };
