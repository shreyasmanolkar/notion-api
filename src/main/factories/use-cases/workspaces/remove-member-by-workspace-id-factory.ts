import { RemoveMemberByWorkspaceIdInterface } from '@application/interfaces/use-cases/workspaces/RemoveMemberByWorkspaceIdInterface';
import { RemoveMemberByWorkspaceId } from '@application/use-cases/workspaces/RemoveMemberByWorkspaceId';
import { WorkspaceRepository } from '@infrastructure/db/mongodb/repositories/WorkspaceRepository';

export const makeRemoveMemberByWorkspaceId =
  (): RemoveMemberByWorkspaceIdInterface => {
    const workspaceRepository = new WorkspaceRepository();

    return new RemoveMemberByWorkspaceId(
      workspaceRepository,
      workspaceRepository
    );
  };
