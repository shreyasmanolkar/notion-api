import { BaseController } from '@infrastructure/http/controllers/BaseController';
import { UpdatePageCoverByPageIdController } from '@infrastructure/http/controllers/pages/UpdatePageCoverByPageIdController';
import { makeUpdatePageCoverByPageIdValidation } from '@main/factories/controllers/pages/update-page-cover-by-page-id/validation-factory';
import { makeGetPageById } from '@main/factories/use-cases/pages/get-page-by-id-factory';
import { makeUpdatePageCoverByPageId } from '@main/factories/use-cases/pages/update-page-cover-by-page-id-factory';

export const makeUpdatePageCoverByPageIdController = (): BaseController => {
  const validation = makeUpdatePageCoverByPageIdValidation();
  const getPageByIdUseCase = makeGetPageById();
  const updatePageCoverByPageIdUseCase = makeUpdatePageCoverByPageId();

  return new UpdatePageCoverByPageIdController(
    validation,
    getPageByIdUseCase,
    updatePageCoverByPageIdUseCase
  );
};
