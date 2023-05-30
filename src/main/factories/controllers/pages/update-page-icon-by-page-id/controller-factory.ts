import { BaseController } from '@infrastructure/http/controllers/BaseController';
import { UpdatePageIconByPageIdController } from '@infrastructure/http/controllers/pages/UpdatePageIconByPageIdController';
import { makeUpdatePageIconByPageIdValidation } from '@main/factories/controllers/pages/update-page-icon-by-page-id/validation-factory';
import { makeGetPageById } from '@main/factories/use-cases/pages/get-page-by-id-factory';
import { makeUpdatePageIconByPageId } from '@main/factories/use-cases/pages/update-page-icon-by-page-id-factory';

export const makeUpdatePageIconByPageIdController = (): BaseController => {
  const validation = makeUpdatePageIconByPageIdValidation();
  const getPageByIdUseCase = makeGetPageById();
  const updatePageIconByPageIdUseCase = makeUpdatePageIconByPageId();

  return new UpdatePageIconByPageIdController(
    validation,
    getPageByIdUseCase,
    updatePageIconByPageIdUseCase
  );
};
