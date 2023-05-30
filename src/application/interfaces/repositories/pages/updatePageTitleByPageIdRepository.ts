import { Page } from '@domain/entities/Page';

export namespace UpdatePageTitleByPageIdRepository {
  export type Request = {
    pageId: string;
    title: string;
  };
  export type Response = Page;
}

export interface UpdatePageTitleByPageIdRepository {
  updatePageTitleByPageId(
    params: UpdatePageTitleByPageIdRepository.Request
  ): Promise<UpdatePageTitleByPageIdRepository.Response>;
}
