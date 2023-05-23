import { PageType } from '@domain/entities/Workspace';

export namespace GetAllRootPagesRepository {
  export type Request = string;
  export type Response = PageType[] | null;
}

export interface GetAllRootPagesRepository {
  getAllRootPages(
    workspaceId: GetAllRootPagesRepository.Request
  ): Promise<GetAllRootPagesRepository.Response>;
}
