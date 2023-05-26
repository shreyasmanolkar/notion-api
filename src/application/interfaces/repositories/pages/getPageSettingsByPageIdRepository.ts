import { PageSettingsType } from '@domain/entities/Page';

export namespace GetPageSettingsByPageIdRepository {
  export type Request = string;
  export type Response = PageSettingsType | null;
}

export interface GetPageSettingsByPageIdRepository {
  getPageSettingsByPageId(
    pageId: GetPageSettingsByPageIdRepository.Request
  ): Promise<GetPageSettingsByPageIdRepository.Response>;
}
