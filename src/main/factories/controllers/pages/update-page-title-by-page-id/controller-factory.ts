import { BaseController } from '@infrastructure/http/controllers/BaseController';
import { UpdatePageTitleByPageIdController } from '@infrastructure/http/controllers/pages/UpdatePageTitleByPageIdController';
import { makeUpdatePageTitleByPageIdValidation } from '@main/factories/controllers/pages/update-page-title-by-page-id/validation-factory';
import { makeGetPageById } from '@main/factories/use-cases/pages/get-page-by-id-factory';
import { makeUpdatePageTitleByPageId } from '@main/factories/use-cases/pages/update-page-title-by-page-id-factory';

export const makeUpdatePageTitleByPageIdController = (): BaseController => {
  const validation = makeUpdatePageTitleByPageIdValidation();
  const getPageByIdUseCase = makeGetPageById();
  const updatePageTitleByPageIdUseCase = makeUpdatePageTitleByPageId();

  return new UpdatePageTitleByPageIdController(
    validation,
    getPageByIdUseCase,
    updatePageTitleByPageIdUseCase
  );
};
