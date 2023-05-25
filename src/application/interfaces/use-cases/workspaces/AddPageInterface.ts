import { WorkspaceNotFoundError } from '@application/errors/WorkspaceNotFoundError';
import { UseCase } from '@application/interfaces/use-cases/UseCase';
import { PageType, Workspace } from '@domain/entities/Workspace';

export namespace AddPageInterface {
  export type Request = {
    workspaceId: string;
    pageData: PageType;
  };
  export type Response = Workspace | WorkspaceNotFoundError;
}

export interface AddPageInterface
  extends UseCase<AddPageInterface.Request, AddPageInterface.Response> {
  execute(params: AddPageInterface.Request): Promise<AddPageInterface.Response>;
}
