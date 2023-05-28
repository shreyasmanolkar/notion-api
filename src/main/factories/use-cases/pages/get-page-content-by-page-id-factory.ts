import { GetPageContentByPageIdInterface } from '@application/interfaces/use-cases/pages/getPageContentByPageIdInterface';
import { GetPageContentByPageId } from '@application/use-cases/pages/GetPageContentByPageId';
import { PageRepository } from '@infrastructure/db/mongodb/repositories/PageRepository';

export const makeGetPageContentByPageId =
  (): GetPageContentByPageIdInterface => {
    const pageRepository = new PageRepository();

    return new GetPageContentByPageId(pageRepository);
  };
