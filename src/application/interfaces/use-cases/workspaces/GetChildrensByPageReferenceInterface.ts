import { WorkspaceNotFoundError } from '@application/errors/WorkspaceNotFoundError';
import { UseCase } from '@application/interfaces/use-cases/UseCase';
import { PageType } from '@domain/entities/Workspace';

export namespace GetChildrensByPageReferenceInterface {
  export type Request = {
    workspaceId: string;
    pageReference: string;
  };
  export type Response = PageType[] | null | WorkspaceNotFoundError;
}

export interface GetChildrensByPageReferenceInterface
  extends UseCase<
    GetChildrensByPageReferenceInterface.Request,
    GetChildrensByPageReferenceInterface.Response
  > {
  execute(
    params: GetChildrensByPageReferenceInterface.Request
  ): Promise<GetChildrensByPageReferenceInterface.Response>;
}
