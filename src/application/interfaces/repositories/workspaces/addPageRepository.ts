import { Workspace } from '@domain/entities/Workspace';

export namespace AddPageRepository {
  export type Request = {
    workspaceId: string;
    reference: string;
    Path: string;
    id: string;
    icon: string;
  };
  export type Response = Workspace;
}

export interface AddPageRepository {
  addPage(
    params: AddPageRepository.Request
  ): Promise<AddPageRepository.Response>;
}
