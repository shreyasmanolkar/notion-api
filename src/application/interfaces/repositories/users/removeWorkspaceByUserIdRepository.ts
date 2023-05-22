import { User } from '@domain/entities/User';

export namespace RemoveWorkspaceByUserIdRepository {
  export type Request = {
    userId: string;
    workspaceId: string;
  };
  export type Response = User;
}

export interface RemoveWorkspaceByUserIdRepository {
  removeWorkspaceByUserId(
    params: RemoveWorkspaceByUserIdRepository.Request
  ): Promise<RemoveWorkspaceByUserIdRepository.Response>;
}
