import { Workspace } from '@domain/entities/Workspace';

export namespace GetWorkspaceByIdRepository {
  export type Request = string;
  export type Response = Workspace | null;
}

export interface GetWorkspaceByIdRepository {
  getWorkspaceById(
    workspaceId: GetWorkspaceByIdRepository.Request
  ): Promise<GetWorkspaceByIdRepository.Response>;
}
