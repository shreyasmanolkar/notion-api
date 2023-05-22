import { UseCase } from '@application/interfaces/use-cases/UseCase';

export namespace DeleteWorkspaceInterface {
  export type Request = string;
  export type Response = void;
}

export interface DeleteWorkspaceInterface
  extends UseCase<
    DeleteWorkspaceInterface.Request,
    DeleteWorkspaceInterface.Response
  > {
  execute(
    workspaceId: DeleteWorkspaceInterface.Request
  ): Promise<DeleteWorkspaceInterface.Response>;
}
