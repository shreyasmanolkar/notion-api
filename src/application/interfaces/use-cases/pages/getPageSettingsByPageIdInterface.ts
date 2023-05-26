import { PageNotFoundError } from '@application/errors/PageNotFoundError';
import { UseCase } from '@application/interfaces/use-cases/UseCase';
import { PageSettingsType } from '@domain/entities/Page';

export namespace GetPageSettingsByPageIdInterface {
  export type Request = string;
  export type Response = PageSettingsType | PageNotFoundError;
}

export interface GetPageSettingsByPageIdInterface
  extends UseCase<
    GetPageSettingsByPageIdInterface.Request,
    GetPageSettingsByPageIdInterface.Response
  > {
  execute(
    pageId: GetPageSettingsByPageIdInterface.Request
  ): Promise<GetPageSettingsByPageIdInterface.Response>;
}
