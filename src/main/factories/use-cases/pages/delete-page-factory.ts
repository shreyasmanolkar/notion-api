import { DeletePageInterface } from '@application/interfaces/use-cases/pages/deletePageInterface';
import { DeletePage } from '@application/use-cases/pages/DeletePage';
import { PageRepository } from '@infrastructure/db/mongodb/repositories/PageRepository';

export const makeDeletePage = (): DeletePageInterface => {
  const pageRepository = new PageRepository();

  return new DeletePage(pageRepository);
};
