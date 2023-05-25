import { WorkspaceNotFoundError } from '@application/errors/WorkspaceNotFoundError';
import { UseCase } from '@application/interfaces/use-cases/UseCase';

export namespace GetAllMembersByWorkspaceIdInterface {
  export type Request = string;
  export type Response = string[] | WorkspaceNotFoundError | null;
}

export interface GetAllMembersByWorkspaceIdInterface
  extends UseCase<
    GetAllMembersByWorkspaceIdInterface.Request,
    GetAllMembersByWorkspaceIdInterface.Response
  > {
  execute(
    params: GetAllMembersByWorkspaceIdInterface.Request
  ): Promise<GetAllMembersByWorkspaceIdInterface.Response>;
}
