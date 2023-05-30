import { GetPageByIdInterface } from '@application/interfaces/use-cases/pages/getPageByIdInterface';
import { GetPageById } from '@application/use-cases/pages/GetPageById';
import { PageRepository } from '@infrastructure/db/mongodb/repositories/PageRepository';

export const makeGetPageById = (): GetPageByIdInterface => {
  const pageRepository = new PageRepository();

  return new GetPageById(pageRepository);
};
