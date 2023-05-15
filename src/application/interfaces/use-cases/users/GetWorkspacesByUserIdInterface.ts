import { WorkspaceType } from '@domain/entities/User';
import { UseCase } from '@application/interfaces/use-cases/UseCase';

export namespace GetWorkspacesByUserIdInterface {
  export type Request = string;
  export type Response = WorkspaceType[];
}

export interface GetWorkspacesByUserIdInterface
  extends UseCase<
    GetWorkspacesByUserIdInterface.Request,
    GetWorkspacesByUserIdInterface.Response
  > {
  execute(
    userId: GetWorkspacesByUserIdInterface.Request
  ): Promise<GetWorkspacesByUserIdInterface.Response>;
}
