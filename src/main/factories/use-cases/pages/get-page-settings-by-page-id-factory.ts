import { GetPageSettingsByPageIdInterface } from '@application/interfaces/use-cases/pages/getPageSettingsByPageIdInterface';
import { GetPageSettingsByPageId } from '@application/use-cases/pages/GetPageSettingsByPageId';
import { PageRepository } from '@infrastructure/db/mongodb/repositories/PageRepository';

export const makeGetPageSettingsByPageId =
  (): GetPageSettingsByPageIdInterface => {
    const pageRepository = new PageRepository();

    return new GetPageSettingsByPageId(pageRepository);
  };
