import { WorkspaceNotFoundError } from '@application/errors/WorkspaceNotFoundError';
import { UseCase } from '@application/interfaces/use-cases/UseCase';

export namespace RemoveMemberByWorkspaceIdInterface {
  export type Request = {
    workspaceId: string;
    memberId: string;
  };
  export type Response = void | WorkspaceNotFoundError;
}

export interface RemoveMemberByWorkspaceIdInterface
  extends UseCase<
    RemoveMemberByWorkspaceIdInterface.Request,
    RemoveMemberByWorkspaceIdInterface.Response
  > {
  execute(
    params: RemoveMemberByWorkspaceIdInterface.Request
  ): Promise<RemoveMemberByWorkspaceIdInterface.Response>;
}
