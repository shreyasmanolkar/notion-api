import { UpdatePageSettingsByPageIdInterface } from '@application/interfaces/use-cases/pages/updatePageSettingsByPageIdInterface';
import { UpdatePageSettingsByPageId } from '@application/use-cases/pages/UpdatePageSettingsByPageId';
import { PageRepository } from '@infrastructure/db/mongodb/repositories/PageRepository';

export const makeUpdatePageSettingsByPageId =
  (): UpdatePageSettingsByPageIdInterface => {
    const pageRepository = new PageRepository();

    return new UpdatePageSettingsByPageId(pageRepository, pageRepository);
  };
