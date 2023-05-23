import { WorkspaceNotFoundError } from '@application/errors/WorkspaceNotFoundError';
import { UseCase } from '@application/interfaces/use-cases/UseCase';
import { Workspace } from '@domain/entities/Workspace';

export namespace GetWorkspaceByIdInterface {
  export type Request = string;
  export type Response = Workspace | WorkspaceNotFoundError;
}

export interface GetWorkspaceByIdInterface
  extends UseCase<
    GetWorkspaceByIdInterface.Request,
    GetWorkspaceByIdInterface.Response
  > {
  execute(
    workspaceId: GetWorkspaceByIdInterface.Request
  ): Promise<GetWorkspaceByIdInterface.Response>;
}
