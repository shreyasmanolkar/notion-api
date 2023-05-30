import { BaseController } from '@infrastructure/http/controllers/BaseController';
import { UpdatePageSettingsByPageIdController } from '@infrastructure/http/controllers/pages/UpdatePageSettingsByPageIdController';
import { makeUpdatePageSettingsByPageIdValidation } from '@main/factories/controllers/pages/update-page-settings-by-page-id/validation-factory';
import { makeGetPageById } from '@main/factories/use-cases/pages/get-page-by-id-factory';
import { makeUpdatePageSettingsByPageId } from '@main/factories/use-cases/pages/update-page-settings-by-page-id-factory';

export const makeUpdatePageSettingsByPageIdController = (): BaseController => {
  const validation = makeUpdatePageSettingsByPageIdValidation();
  const getPageByIdUseCase = makeGetPageById();
  const updatePageSettingsByPageIdUseCase = makeUpdatePageSettingsByPageId();

  return new UpdatePageSettingsByPageIdController(
    validation,
    getPageByIdUseCase,
    updatePageSettingsByPageIdUseCase
  );
};
