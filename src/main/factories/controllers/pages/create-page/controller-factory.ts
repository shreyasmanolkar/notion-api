import { BaseController } from '@infrastructure/http/controllers/BaseController';
import { makeCreatePageValidation } from '@main/factories/controllers/pages/create-page/validation-factory';
import { makeCreatePage } from '@main/factories/use-cases/pages/create-page-factory';
import { CreatePageController } from '@infrastructure/http/controllers/pages/CreatePageController';

export const makeCreatePageController = (): BaseController => {
  const validation = makeCreatePageValidation();
  const createPageUseCase = makeCreatePage();

  return new CreatePageController(validation, createPageUseCase);
};
