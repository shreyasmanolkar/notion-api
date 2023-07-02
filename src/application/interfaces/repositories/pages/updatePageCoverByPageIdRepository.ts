import { Page } from '@domain/entities/Page';

export namespace UpdatePageCoverByPageIdRepository {
  export type Request = {
    pageId: string;
    url: string;
    verticalPosition: number;
  };
  export type Response = Page;
}

export interface UpdatePageCoverByPageIdRepository {
  updatePageCoverByPageId(
    params: UpdatePageCoverByPageIdRepository.Request
  ): Promise<UpdatePageCoverByPageIdRepository.Response>;
}
