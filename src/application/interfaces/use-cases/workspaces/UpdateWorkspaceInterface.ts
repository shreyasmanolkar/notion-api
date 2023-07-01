import { WorkspaceNotFoundError } from '@application/errors/WorkspaceNotFoundError';
import { UseCase } from '@application/interfaces/use-cases/UseCase';
import { Workspace, WorkspaceProps } from '@domain/entities/Workspace';

export namespace UpdateWorkspaceInterface {
  export type WorkspaceIdType = string;
  export type WorkspaceDataType = Partial<
    Omit<WorkspaceProps, 'id' | 'createdAt' | 'updatedAt' | 'members'>
  >;

  export type Request = {
    workspaceId: WorkspaceIdType;
    workspaceData: WorkspaceDataType;
  };
  export type Response = Workspace | WorkspaceNotFoundError;
}

export interface UpdateWorkspaceInterface
  extends UseCase<
    UpdateWorkspaceInterface.Request,
    UpdateWorkspaceInterface.Response
  > {
  execute(
    params: UpdateWorkspaceInterface.Request
  ): Promise<UpdateWorkspaceInterface.Response>;
}
