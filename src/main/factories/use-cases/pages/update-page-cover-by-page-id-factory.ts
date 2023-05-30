import { UpdatePageCoverByPageIdInterface } from '@application/interfaces/use-cases/pages/updatePageCoverByPageIdInterface';
import { UpdatePageCoverByPageId } from '@application/use-cases/pages/UpdatePageCoverByPageId';
import { PageRepository } from '@infrastructure/db/mongodb/repositories/PageRepository';

export const makeUpdatePageCoverByPageId =
  (): UpdatePageCoverByPageIdInterface => {
    const pageRepository = new PageRepository();

    return new UpdatePageCoverByPageId(pageRepository, pageRepository);
  };
