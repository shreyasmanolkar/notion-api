import { Workspace } from '@domain/entities/Workspace';

export namespace AddPageRepository {
  export type Request = {
    workspaceId: string;
    id: string;
    reference: string;
    path: string | null;
    icon: string;
  };
  export type Response = Workspace;
}

export interface AddPageRepository {
  addPage(
    params: AddPageRepository.Request
  ): Promise<AddPageRepository.Response>;
}
