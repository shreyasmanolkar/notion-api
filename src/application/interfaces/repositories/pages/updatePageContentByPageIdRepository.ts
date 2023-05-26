import { ContentType, Page } from '@domain/entities/Page';

export namespace UpdatePageContentByPageIdRepository {
  export type Request = {
    pageId: string;
    content: ContentType;
  };
  export type Response = Page;
}

export interface UpdatePageContentByPageIdRepository {
  updatePageContentByPageId(
    params: UpdatePageContentByPageIdRepository.Request
  ): Promise<UpdatePageContentByPageIdRepository.Response>;
}
