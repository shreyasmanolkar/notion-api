import { Workspace } from '@domain/entities/Workspace';

export namespace RemovePageByPageIdRepository {
  export type Request = {
    workspaceId: string;
    pageId: string;
  };
  export type Response = Workspace;
}

export interface RemovePageByPageIdRepository {
  removePageByPageId(
    params: RemovePageByPageIdRepository.Request
  ): Promise<RemovePageByPageIdRepository.Response>;
}
