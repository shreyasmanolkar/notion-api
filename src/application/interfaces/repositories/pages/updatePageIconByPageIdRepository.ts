import { Page } from '@domain/entities/Page';

export namespace UpdatePageIconByPageIdRepository {
  export type Request = {
    pageId: string;
    icon: string;
  };
  export type Response = Page;
}

export interface UpdatePageIconByPageIdRepository {
  updatePageIconByPageId(
    params: UpdatePageIconByPageIdRepository.Request
  ): Promise<UpdatePageIconByPageIdRepository.Response>;
}
