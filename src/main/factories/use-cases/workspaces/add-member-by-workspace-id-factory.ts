import { AddMemberByWorkspaceIdInterface } from '@application/interfaces/use-cases/workspaces/AddMemberByWorkspaceIdInterface';
import { AddMemberByWorkspaceId } from '@application/use-cases/workspaces/AddMemberByWorkspaceId';
import { WorkspaceRepository } from '@infrastructure/db/mongodb/repositories/WorkspaceRepository';

export const makeAddMemberByWorkspaceId =
  (): AddMemberByWorkspaceIdInterface => {
    const workspaceRepository = new WorkspaceRepository();

    return new AddMemberByWorkspaceId(workspaceRepository, workspaceRepository);
  };
