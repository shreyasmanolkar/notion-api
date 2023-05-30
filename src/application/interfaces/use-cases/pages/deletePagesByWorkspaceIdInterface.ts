import { UseCase } from '@application/interfaces/use-cases/UseCase';

export namespace DeletePagesByWorkspaceIdInterface {
  export type Request = string;
  export type Response = void;
}

export interface DeletePagesByWorkspaceIdInterface
  extends UseCase<
    DeletePagesByWorkspaceIdInterface.Request,
    DeletePagesByWorkspaceIdInterface.Response
  > {
  execute(
    workspaceId: DeletePagesByWorkspaceIdInterface.Request
  ): Promise<DeletePagesByWorkspaceIdInterface.Response>;
}
