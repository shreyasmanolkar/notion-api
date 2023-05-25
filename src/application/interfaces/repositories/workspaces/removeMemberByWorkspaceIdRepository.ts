import { Workspace } from '@domain/entities/Workspace';

export namespace RemoveMemberByWorkspaceIdRepository {
  export type Request = {
    workspaceId: string;
    memberId: string;
  };
  export type Response = Workspace;
}

export interface RemoveMemberByWorkspaceIdRepository {
  removeMemberByWorkspaceId(
    params: RemoveMemberByWorkspaceIdRepository.Request
  ): Promise<RemoveMemberByWorkspaceIdRepository.Response>;
}
