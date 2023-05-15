import { UseCase } from '@application/interfaces/use-cases/UseCase';

export namespace RemoveWorkspaceByUserIdInterface {
  export type Request = {
    userId: string;
    workspaceId: string;
  };
  export type Response = void;
}

export interface RemoveWorkspaceByUserIdInterface
  extends UseCase<
    RemoveWorkspaceByUserIdInterface.Request,
    RemoveWorkspaceByUserIdInterface.Response
  > {
  execute(
    params: RemoveWorkspaceByUserIdInterface.Request
  ): Promise<RemoveWorkspaceByUserIdInterface.Response>;
}
