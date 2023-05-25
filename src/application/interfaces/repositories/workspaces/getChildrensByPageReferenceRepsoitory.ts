import { PageType } from '@domain/entities/Workspace';

export namespace GetChildrensByPageReferenceRepository {
  export type Request = { workspaceId: string; pageReference: string };
  export type Response = PageType[] | null;
}

export interface GetChildrensByPageReferenceRepository {
  getChildrensByPageId(
    params: GetChildrensByPageReferenceRepository.Request
  ): Promise<GetChildrensByPageReferenceRepository.Response>;
}
