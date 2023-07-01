import { GetPageIdsByPathInterface } from '@application/interfaces/use-cases/pages/getPageIdsByPathInterface';
import { GetPageIdsByPath } from '@application/use-cases/pages/GetPageIdsByPath';
import { PageRepository } from '@infrastructure/db/mongodb/repositories/PageRepository';

export const makeGetPageIdsByPath = (): GetPageIdsByPathInterface => {
  const pageRepository = new PageRepository();

  return new GetPageIdsByPath(pageRepository);
};
