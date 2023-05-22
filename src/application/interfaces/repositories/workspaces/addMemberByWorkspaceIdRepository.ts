import { Workspace } from '@domain/entities/Workspace';

export namespace AddMemberByWorkspaceIdRepository {
  export type Request = {
    workspaceId: string;
    memberId: string;
  };
  export type Response = Workspace;
}

export interface AddMemberByWorkspaceIdRepository {
  addMemberByWorkspaceId(
    params: AddMemberByWorkspaceIdRepository.Request
  ): Promise<AddMemberByWorkspaceIdRepository.Response>;
}
