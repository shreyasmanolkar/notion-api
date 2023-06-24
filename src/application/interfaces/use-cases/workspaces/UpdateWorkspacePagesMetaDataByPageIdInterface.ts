import { PageNotFoundError } from '@application/errors/PageNotFoundError';
import { WorkspaceNotFoundError } from '@application/errors/WorkspaceNotFoundError';
import { updatedPagesDataType } from '@application/interfaces/repositories/workspaces/updateWorkspacePagesMetaDataByPageIdRepository';
import { UseCase } from '@application/interfaces/use-cases/UseCase';

export namespace UpdateWorkspacePagesMetaDataByPageIdInterface {
  export type Request = {
    workspaceId: string;
    pageId: string;
    pageData: updatedPagesDataType;
  };
  export type Response = void | WorkspaceNotFoundError | PageNotFoundError;
}

export interface UpdateWorkspacePagesMetaDataByPageIdInterface
  extends UseCase<
    UpdateWorkspacePagesMetaDataByPageIdInterface.Request,
    UpdateWorkspacePagesMetaDataByPageIdInterface.Response
  > {
  execute(
    params: UpdateWorkspacePagesMetaDataByPageIdInterface.Request
  ): Promise<UpdateWorkspacePagesMetaDataByPageIdInterface.Response>;
}
