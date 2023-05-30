import { UpdatePageContentByPageIdInterface } from '@application/interfaces/use-cases/pages/updatePageContentByPageIdInterface';
import { UpdatePageContentByPageId } from '@application/use-cases/pages/UpdatePageContentByPageId';
import { PageRepository } from '@infrastructure/db/mongodb/repositories/PageRepository';

export const makeUpdatePageContentByPageId =
  (): UpdatePageContentByPageIdInterface => {
    const pageRepository = new PageRepository();

    return new UpdatePageContentByPageId(pageRepository, pageRepository);
  };
