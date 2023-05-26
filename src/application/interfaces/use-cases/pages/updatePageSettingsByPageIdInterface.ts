import { PageNotFoundError } from '@application/errors/PageNotFoundError';
import { UseCase } from '@application/interfaces/use-cases/UseCase';
import { Page, PageSettingsType } from '@domain/entities/Page';

export namespace UpdatePageSettingsByPageIdInterface {
  export type pageIdType = string;
  export type pageSettingsType = PageSettingsType;

  export type Request = {
    pageId: pageIdType;
    settings: PageSettingsType;
  };
  export type Response = Page | PageNotFoundError;
}

export interface UpdatePageSettingsByPageIdInterface
  extends UseCase<
    UpdatePageSettingsByPageIdInterface.Request,
    UpdatePageSettingsByPageIdInterface.Response
  > {
  execute(
    params: UpdatePageSettingsByPageIdInterface.Request
  ): Promise<UpdatePageSettingsByPageIdInterface.Response>;
}
