import { Workspace, WorkspaceProps } from '@domain/entities/Workspace';

export namespace UpdateWorkspaceRepository {
  export type Request = {
    workspaceId: string;
    workspaceData: Partial<
      Omit<WorkspaceProps, 'id' | 'createdAt' | 'updatedAt' | 'members'>
    >;
  };
  export type Response = Workspace;
}

export interface UpdateWorkspaceRepository {
  updateWorkspace(
    params: UpdateWorkspaceRepository.Request
  ): Promise<UpdateWorkspaceRepository.Response>;
}
