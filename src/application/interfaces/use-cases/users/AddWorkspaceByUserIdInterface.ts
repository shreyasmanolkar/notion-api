import { UserNotFoundError } from '@application/errors/UserNotFoundError';
import { UseCase } from '@application/interfaces/use-cases/UseCase';

export namespace AddWorkspaceByUserIdInterface {
  export type Request = {
    userId: string;
    workspaceId: string;
    workspaceName: string;
    workspaceIcon: string;
  };
  export type Response = void | UserNotFoundError;
}

export interface AddWorkspaceByUserIdInterface
  extends UseCase<
    AddWorkspaceByUserIdInterface.Request,
    AddWorkspaceByUserIdInterface.Response
  > {
  execute(
    params: AddWorkspaceByUserIdInterface.Request
  ): Promise<AddWorkspaceByUserIdInterface.Response>;
}
