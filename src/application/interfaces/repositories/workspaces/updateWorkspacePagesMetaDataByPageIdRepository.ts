export type updatedPagesDataType = {
  title?: string;
  icon?: string;
  reference?: string;
  path?: string;
};

export namespace UpdateWorkspacePagesMetaDataByPageIdRepository {
  export type Request = {
    workspaceId: string;
    pageId: string;
    pageData: updatedPagesDataType;
  };
  export type Response = void;
}

export interface UpdateWorkspacePagesMetaDataByPageIdRepository {
  updateWorkspacePagesMetaDataByPageId(
    params: UpdateWorkspacePagesMetaDataByPageIdRepository.Request
  ): Promise<UpdateWorkspacePagesMetaDataByPageIdRepository.Response>;
}
