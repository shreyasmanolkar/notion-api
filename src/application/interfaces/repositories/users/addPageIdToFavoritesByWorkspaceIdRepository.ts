import { User } from '@domain/entities/User';

export namespace AddPageIdToFavoritesByWorkspaceIdRepository {
  export type Request = {
    userId: string;
    workspaceId: string;
    pageId: string;
  };
  export type Response = User;
}

export interface AddPageIdToFavoritesByWorkspaceIdRepository {
  addPageIdToFavoritesByWorkspaceId(
    params: AddPageIdToFavoritesByWorkspaceIdRepository.Request
  ): Promise<AddPageIdToFavoritesByWorkspaceIdRepository.Response>;
}
