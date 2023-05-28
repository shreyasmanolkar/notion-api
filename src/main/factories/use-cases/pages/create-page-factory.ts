import { CreatePageInterface } from '@application/interfaces/use-cases/pages/createPageInterface';
import { CreatePage } from '@application/use-cases/pages/CreatePage';
import { PageRepository } from '@infrastructure/db/mongodb/repositories/PageRepository';

export const makeCreatePage = (): CreatePageInterface => {
  const pageRepository = new PageRepository();

  return new CreatePage(pageRepository);
};
