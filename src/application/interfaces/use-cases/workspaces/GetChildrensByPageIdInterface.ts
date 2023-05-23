import { WorkspaceNotFoundError } from '@application/errors/WorkspaceNotFoundError';
import { UseCase } from '@application/interfaces/use-cases/UseCase';
import { PageType } from '@domain/entities/Workspace';

export namespace GetChildrensByPageIdInterface {
  export type Request = {
    workspaceId: string;
    pageId: string;
  };
  export type Response = PageType[] | null | WorkspaceNotFoundError;
}

export interface GetChildrensByPageIdInterface
  extends UseCase<
    GetChildrensByPageIdInterface.Request,
    GetChildrensByPageIdInterface.Response
  > {
  execute(
    params: GetChildrensByPageIdInterface.Request
  ): Promise<GetChildrensByPageIdInterface.Response>;
}
