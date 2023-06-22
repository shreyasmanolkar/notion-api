import { UserNotFoundError } from '@application/errors/UserNotFoundError';
import { WorkspaceNotFoundError } from '@application/errors/WorkspaceNotFoundError';
import { updatedWorkspaceDataType } from '@application/interfaces/repositories/users/updateUserWorkspaceMetaDataByWorkspaceIdRepository';
import { UseCase } from '@application/interfaces/use-cases/UseCase';

export namespace UpdateUserWorkspaceMetaDataByWorkspaceIdInterface {
  export type Request = {
    userId: string;
    workspaceId: string;
    workspaceData: updatedWorkspaceDataType;
  };
  export type Response = void | UserNotFoundError | WorkspaceNotFoundError;
}

export interface UpdateUserWorkspaceMetaDataByWorkspaceIdInterface
  extends UseCase<
    UpdateUserWorkspaceMetaDataByWorkspaceIdInterface.Request,
    UpdateUserWorkspaceMetaDataByWorkspaceIdInterface.Response
  > {
  execute(
    params: UpdateUserWorkspaceMetaDataByWorkspaceIdInterface.Request
  ): Promise<UpdateUserWorkspaceMetaDataByWorkspaceIdInterface.Response>;
}
