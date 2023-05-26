import { Page } from '@domain/entities/Page';

export namespace GetPageByIdRepository {
  export type Request = string;
  export type Response = Page | null;
}

export interface GetPageByIdRepository {
  getPageById(
    pageId: GetPageByIdRepository.Request
  ): Promise<GetPageByIdRepository.Response>;
}
