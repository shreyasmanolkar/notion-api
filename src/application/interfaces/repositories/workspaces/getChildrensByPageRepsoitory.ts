import { PageType } from '@domain/entities/Workspace';

export namespace GetChildrensByPageIdRepository {
  export type Request = { workspaceId: string; pageId: string };
  export type Response = PageType[] | null;
}

export interface GetChildrensByPageIdRepository {
  getChildrensByPageId(
    params: GetChildrensByPageIdRepository.Request
  ): Promise<GetChildrensByPageIdRepository.Response>;
}
