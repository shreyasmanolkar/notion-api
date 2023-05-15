import { UseCase } from '@application/interfaces/use-cases/UseCase';

export namespace AddWorkspaceByUserIdInterface {
  export type Request = {
    userId: string;
    workspaceId: string;
  };
  export type Response = void;
}

export interface AddWorkspaceByUserIdInterface
  extends UseCase<
    AddWorkspaceByUserIdInterface.Request,
    AddWorkspaceByUserIdInterface.Response
  > {
  execute(
    params: AddWorkspaceByUserIdInterface.Request
  ): Promise<AddWorkspaceByUserIdInterface.Response>;
}
