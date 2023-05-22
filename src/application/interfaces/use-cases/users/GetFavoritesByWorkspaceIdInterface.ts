import { WorkspaceNotFoundError } from '@application/errors/WorkspaceNotFoundError';
import { UseCase } from '@application/interfaces/use-cases/UseCase';

export namespace GetFavoritesByWorkspaceIdInterface {
  export type Request = {
    userId: string;
    workspaceId: string;
  };
  export type Response = string[] | WorkspaceNotFoundError;
}

export interface GetFavoritesByWorkspaceIdInterface
  extends UseCase<
    GetFavoritesByWorkspaceIdInterface.Request,
    GetFavoritesByWorkspaceIdInterface.Response
  > {
  execute(
    params: GetFavoritesByWorkspaceIdInterface.Request
  ): Promise<GetFavoritesByWorkspaceIdInterface.Response>;
}
