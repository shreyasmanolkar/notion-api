import { UpdatePageTitleByPageIdInterface } from '@application/interfaces/use-cases/pages/updatePageTitleByPageIdInterface';
import { UpdatePageTitleByPageId } from '@application/use-cases/pages/UpdatePageTitleByPageId';
import { PageRepository } from '@infrastructure/db/mongodb/repositories/PageRepository';

export const makeUpdatePageTitleByPageId =
  (): UpdatePageTitleByPageIdInterface => {
    const pageRepository = new PageRepository();

    return new UpdatePageTitleByPageId(pageRepository, pageRepository);
  };
