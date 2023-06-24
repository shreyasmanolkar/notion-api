import { UpdateWorkspacePagesMetaDataByPageIdInterface } from '@application/interfaces/use-cases/workspaces/UpdateWorkspacePagesMetaDataByPageIdInterface';
import { UpdateWorkspacePagesMetaDataByPageId } from '@application/use-cases/workspaces/UpdateWorkspacePagesMetaDataByPageId';
import { WorkspaceRepository } from '@infrastructure/db/mongodb/repositories/WorkspaceRepository';

export const makeUpdateWorkspacePagesMetaDataByWorkspaceId =
  (): UpdateWorkspacePagesMetaDataByPageIdInterface => {
    const workspaceRepository = new WorkspaceRepository();

    return new UpdateWorkspacePagesMetaDataByPageId(
      workspaceRepository,
      workspaceRepository
    );
  };
