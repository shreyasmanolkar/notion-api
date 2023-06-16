import { User } from '@domain/entities/User';

export namespace AddWorkspaceByUserIdRepository {
  export type Request = {
    userId: string;
    workspaceId: string;
    workspaceName: string;
    workspaceIcon: string;
  };
  export type Response = User;
}

export interface AddWorkspaceByUserIdRepository {
  addWorkspaceByUserId(
    params: AddWorkspaceByUserIdRepository.Request
  ): Promise<AddWorkspaceByUserIdRepository.Response>;
}
