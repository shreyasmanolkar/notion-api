import { UpdatePageIconByPageIdInterface } from '@application/interfaces/use-cases/pages/updatePageIconByPageIdInterface';
import { UpdatePageIconByPageId } from '@application/use-cases/pages/UpdatePageIconByPageId';
import { PageRepository } from '@infrastructure/db/mongodb/repositories/PageRepository';

export const makeUpdatePageIconByPageId =
  (): UpdatePageIconByPageIdInterface => {
    const pageRepository = new PageRepository();

    return new UpdatePageIconByPageId(pageRepository, pageRepository);
  };
