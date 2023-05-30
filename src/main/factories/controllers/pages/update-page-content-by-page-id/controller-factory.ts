import { BaseController } from '@infrastructure/http/controllers/BaseController';
import { UpdatePageContentByPageIdController } from '@infrastructure/http/controllers/pages/UpdatePageContentByPageIdController';
import { makeUpdatePageContentByPageIdValidation } from '@main/factories/controllers/pages/update-page-content-by-page-id/validation-factory';
import { makeGetPageById } from '@main/factories/use-cases/pages/get-page-by-id-factory';
import { makeUpdatePageContentByPageId } from '@main/factories/use-cases/pages/update-page-content-by-page-id-factory';

export const makeUpdatePageContentByPageIdController = (): BaseController => {
  const validation = makeUpdatePageContentByPageIdValidation();
  const getPageByIdUseCase = makeGetPageById();
  const updatePageContentByPageIdUseCase = makeUpdatePageContentByPageId();

  return new UpdatePageContentByPageIdController(
    validation,
    getPageByIdUseCase,
    updatePageContentByPageIdUseCase
  );
};
