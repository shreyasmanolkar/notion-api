import { User } from '@domain/entities/User';

export namespace RemovePageIdFromFavoritesByWorkspaceIdRepository {
  export type Request = {
    userId: string;
    workspaceId: string;
    pageId: string;
  };
  export type Response = User;
}

export interface RemovePageIdFromFavoritesByWorkspaceIdRepository {
  removePageIdFromFavoritesByWorkspaceId(
    params: RemovePageIdFromFavoritesByWorkspaceIdRepository.Request
  ): Promise<RemovePageIdFromFavoritesByWorkspaceIdRepository.Response>;
}
