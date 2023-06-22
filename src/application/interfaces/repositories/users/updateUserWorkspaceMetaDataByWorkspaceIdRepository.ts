export type updatedWorkspaceDataType = {
  workspaceName?: string;
  workspaceIcon?: string;
};

export namespace UpdateUserWorkspaceMetaDataByWorkspaceIdRepository {
  export type Request = {
    userId: string;
    workspaceId: string;
    workspaceData: updatedWorkspaceDataType;
  };
  export type Response = void;
}

export interface UpdateUserWorkspaceMetaDataByWorkspaceIdRepository {
  updateUserWorkspaceMetaDataByWorkspaceId(
    params: UpdateUserWorkspaceMetaDataByWorkspaceIdRepository.Request
  ): Promise<UpdateUserWorkspaceMetaDataByWorkspaceIdRepository.Response>;
}
