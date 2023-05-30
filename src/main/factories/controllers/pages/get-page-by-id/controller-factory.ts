import { BaseController } from '@infrastructure/http/controllers/BaseController';
import { GetPageByIdController } from '@infrastructure/http/controllers/pages/GetPageByIdController';
import { makeGetPageById } from '@main/factories/use-cases/pages/get-page-by-id-factory';

export const makeGetPageByIdController = (): BaseController => {
  const getPageByIdUseCase = makeGetPageById();

  return new GetPageByIdController(getPageByIdUseCase);
};
