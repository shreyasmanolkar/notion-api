import { GetAllMembersByWorkspaceIdInterface } from '@application/interfaces/use-cases/workspaces/GetAllMembersByWorkspaceIdInterface';
import { GetAllMembersByWorkspaceId } from '@application/use-cases/workspaces/GetAllMembersByWorkspaceId';
import { WorkspaceRepository } from '@infrastructure/db/mongodb/repositories/WorkspaceRepository';

export const makeGetAllMembersByWorkspaceId =
  (): GetAllMembersByWorkspaceIdInterface => {
    const workspaceRepository = new WorkspaceRepository();

    return new GetAllMembersByWorkspaceId(
      workspaceRepository,
      workspaceRepository
    );
  };
