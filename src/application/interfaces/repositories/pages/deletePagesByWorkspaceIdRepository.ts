export namespace DeletePagesByWorkspaceIdRepository {
  export type Request = string;
  export type Response = void;
}

export interface DeletePagesByWorkspaceIdRepository {
  deletePagesByWorkspaceId(
    workspaceId: DeletePagesByWorkspaceIdRepository.Request
  ): Promise<DeletePagesByWorkspaceIdRepository.Response>;
}
