import { UpdatePagePathByPageIdInterface } from '@application/interfaces/use-cases/pages/updatePagePathByPageIdInterface';
import { UpdatePagePathByPageId } from '@application/use-cases/pages/UpdatePagePathByPageId';
import { PageRepository } from '@infrastructure/db/mongodb/repositories/PageRepository';

export const makeUpdatePagePathByPageId =
  (): UpdatePagePathByPageIdInterface => {
    const pageRepository = new PageRepository();

    return new UpdatePagePathByPageId(pageRepository, pageRepository);
  };
