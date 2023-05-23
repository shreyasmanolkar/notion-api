import { WorkspaceNotFoundError } from '@application/errors/WorkspaceNotFoundError';
import { UseCase } from '@application/interfaces/use-cases/UseCase';
import { PageType } from '@domain/entities/Workspace';

export namespace GetAllRootPagesInterface {
  export type Request = string;
  export type Response = PageType[] | WorkspaceNotFoundError | null;
}

export interface GetAllRootPagesInterface
  extends UseCase<
    GetAllRootPagesInterface.Request,
    GetAllRootPagesInterface.Response
  > {
  execute(
    params: GetAllRootPagesInterface.Request
  ): Promise<GetAllRootPagesInterface.Response>;
}
