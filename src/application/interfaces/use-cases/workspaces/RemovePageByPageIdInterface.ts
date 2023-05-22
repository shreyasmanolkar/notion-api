import { WorkspaceNotFoundError } from '@application/errors/WorkspaceNotFoundError';
import { UseCase } from '@application/interfaces/use-cases/UseCase';

export namespace RemovePageByPageIdInterface {
  export type Request = {
    workspaceId: string;
    pageId: string;
  };
  export type Response = void | WorkspaceNotFoundError;
}

export interface RemovePageByPageIdInterface
  extends UseCase<
    RemovePageByPageIdInterface.Request,
    RemovePageByPageIdInterface.Response
  > {
  execute(
    params: RemovePageByPageIdInterface.Request
  ): Promise<RemovePageByPageIdInterface.Response>;
}
