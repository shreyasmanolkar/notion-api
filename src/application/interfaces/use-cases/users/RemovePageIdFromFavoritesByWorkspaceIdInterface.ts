import { WorkspaceNotFoundError } from '@application/errors/WorkspaceNotFoundError';
import { UseCase } from '@application/interfaces/use-cases/UseCase';

export namespace RemovePageIdFromFavoritesByWorkspaceIdInterface {
  export type Request = {
    userId: string;
    workspaceId: string;
    pageId: string;
  };
  export type Response = void | WorkspaceNotFoundError;
}

export interface RemovePageIdFromFavoritesByWorkspaceIdInterface
  extends UseCase<
    RemovePageIdFromFavoritesByWorkspaceIdInterface.Request,
    RemovePageIdFromFavoritesByWorkspaceIdInterface.Response
  > {
  execute(
    params: RemovePageIdFromFavoritesByWorkspaceIdInterface.Request
  ): Promise<RemovePageIdFromFavoritesByWorkspaceIdInterface.Response>;
}
