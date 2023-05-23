export namespace GetAllMembersByWorkspaceIdRepository {
  export type Request = string;
  export type Response = string[] | null;
}

export interface GetAllMembersByWorkspaceIdRepository {
  getAllMembersByWorkspaceId(
    workspaceId: GetAllMembersByWorkspaceIdRepository.Request
  ): Promise<GetAllMembersByWorkspaceIdRepository.Response>;
}
