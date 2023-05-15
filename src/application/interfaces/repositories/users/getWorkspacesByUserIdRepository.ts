import { WorkspaceType } from '@domain/entities/User';

export namespace GetWorkspacesByUserIdRepository {
  export type Request = string;
  export type Response = WorkspaceType[];
}

export interface GetWorkspacesByUserIdRepository {
  getWorkspacesByUserId(
    userId: GetWorkspacesByUserIdRepository.Request
  ): Promise<GetWorkspacesByUserIdRepository.Response>;
}
