export namespace GetFavoritesByWorkspaceIdRepository {
  export type Request = {
    userId: string;
    workspaceId: string;
  };
  export type Response = string[];
}

export interface GetFavoritesByWorkspaceIdRepository {
  getFavoritesByWorkspaceId(
    params: GetFavoritesByWorkspaceIdRepository.Request
  ): Promise<GetFavoritesByWorkspaceIdRepository.Response>;
}
