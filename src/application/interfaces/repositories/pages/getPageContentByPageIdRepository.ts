import { ContentType } from '@domain/entities/Page';

export namespace GetPageContentByPageIdRepository {
  export type Request = string;
  export type Response = ContentType | null;
}

export interface GetPageContentByPageIdRepository {
  getPageContentByPageId(
    pageId: GetPageContentByPageIdRepository.Request
  ): Promise<GetPageContentByPageIdRepository.Response>;
}
