import { UseCase } from '@application/interfaces/use-cases/UseCase';
import { WorkspaceProps } from '@domain/entities/Workspace';

export namespace CreateWorkspaceInterface {
  export type Request = Omit<WorkspaceProps, 'id' | 'createdAt' | 'updatedAt'>;
  export type Response = string;
}

export interface CreateWorkspaceInterface
  extends UseCase<
    CreateWorkspaceInterface.Request,
    CreateWorkspaceInterface.Response
  > {
  execute(
    workspaceData: CreateWorkspaceInterface.Request
  ): Promise<CreateWorkspaceInterface.Response>;
}
