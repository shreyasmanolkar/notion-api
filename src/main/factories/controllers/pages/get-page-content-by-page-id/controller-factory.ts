import { BaseController } from '@infrastructure/http/controllers/BaseController';
import { GetPageContentByPageIdController } from '@infrastructure/http/controllers/pages/GetPageContentByPageIdController';
import { makeGetPageById } from '@main/factories/use-cases/pages/get-page-by-id-factory';
import { makeGetPageContentByPageId } from '@main/factories/use-cases/pages/get-page-content-by-page-id-factory';

export const makeGetPageContentByPageIdController = (): BaseController => {
  const getPageByIdUseCase = makeGetPageById();
  const getPageContentByPageIdUseCase = makeGetPageContentByPageId();

  return new GetPageContentByPageIdController(
    getPageByIdUseCase,
    getPageContentByPageIdUseCase
  );
};
