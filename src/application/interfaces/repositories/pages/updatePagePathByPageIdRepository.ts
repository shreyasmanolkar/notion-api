import { Page } from '@domain/entities/Page';

export namespace UpdatePagePathByPageIdRepository {
  export type Request = {
    pageId: string;
    path: string;
  };
  export type Response = Page;
}

export interface UpdatePagePathByPageIdRepository {
  updatePagePathByPageId(
    params: UpdatePagePathByPageIdRepository.Request
  ): Promise<UpdatePagePathByPageIdRepository.Response>;
}
