import { WorkspaceNotFoundError } from '@application/errors/WorkspaceNotFoundError';
import { UseCase } from '@application/interfaces/use-cases/UseCase';

export namespace AddPageIdToFavoritesByWorkspaceIdInterface {
  export type Request = {
    userId: string;
    workspaceId: string;
    pageId: string;
  };
  export type Response = void | WorkspaceNotFoundError;
}

export interface AddPageIdToFavoritesByWorkspaceIdInterface
  extends UseCase<
    AddPageIdToFavoritesByWorkspaceIdInterface.Request,
    AddPageIdToFavoritesByWorkspaceIdInterface.Response
  > {
  execute(
    params: AddPageIdToFavoritesByWorkspaceIdInterface.Request
  ): Promise<AddPageIdToFavoritesByWorkspaceIdInterface.Response>;
}
