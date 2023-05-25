import { WorkspaceNotFoundError } from '@application/errors/WorkspaceNotFoundError';
import { UseCase } from '@application/interfaces/use-cases/UseCase';

export namespace AddMemberByWorkspaceIdInterface {
  export type Request = {
    workspaceId: string;
    memberId: string;
  };
  export type Response = void | WorkspaceNotFoundError;
}

export interface AddMemberByWorkspaceIdInterface
  extends UseCase<
    AddMemberByWorkspaceIdInterface.Request,
    AddMemberByWorkspaceIdInterface.Response
  > {
  execute(
    params: AddMemberByWorkspaceIdInterface.Request
  ): Promise<AddMemberByWorkspaceIdInterface.Response>;
}
