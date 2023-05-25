import { WorkspaceProps } from '@domain/entities/Workspace';

export namespace CreateWorkspaceRepository {
  export type Request = Omit<WorkspaceProps, 'id' | 'createdAt' | 'updatedAt'>;
  export type Response = string;
}

export interface CreateWorkspaceRepository {
  createWorkspace(
    workspaceData: CreateWorkspaceRepository.Request
  ): Promise<CreateWorkspaceRepository.Response>;
}
