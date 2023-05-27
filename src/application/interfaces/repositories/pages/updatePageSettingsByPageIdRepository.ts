import { Page, PageSettingsType } from '@domain/entities/Page';

export namespace UpdatePageSettingsByPageIdRepository {
  export type Request = {
    pageId: string;
    settings: Partial<PageSettingsType>;
  };
  export type Response = Page;
}

export interface UpdatePageSettingsByPageIdRepository {
  updatePageSettingsByPageId(
    params: UpdatePageSettingsByPageIdRepository.Request
  ): Promise<UpdatePageSettingsByPageIdRepository.Response>;
}
