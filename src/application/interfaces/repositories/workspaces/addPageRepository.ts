import { PageType, Workspace } from '@domain/entities/Workspace';

export namespace AddPageRepository {
  export type Request = {
    workspaceId: string;
    pageData: PageType;
  };
  export type Response = Workspace;
}

export interface AddPageRepository {
  addPage(
    params: AddPageRepository.Request
  ): Promise<AddPageRepository.Response>;
}
