export namespace DeleteWorkspaceRepository {
  export type Request = string;
  export type Response = void;
}

export interface DeleteWorkspaceRepository {
  deleteWorkspace(
    workspaceId: DeleteWorkspaceRepository.Request
  ): Promise<DeleteWorkspaceRepository.Response>;
}
