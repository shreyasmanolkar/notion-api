import { BaseController } from '@infrastructure/http/controllers/BaseController';
import { GetPageSettingsByPageIdController } from '@infrastructure/http/controllers/pages/GetPageSettingsByPageIdController';
import { makeGetPageById } from '@main/factories/use-cases/pages/get-page-by-id-factory';
import { makeGetPageSettingsByPageId } from '@main/factories/use-cases/pages/get-page-settings-by-page-id-factory';

export const makeGetPageSettingsByPageIdController = (): BaseController => {
  const getPageByIdUseCase = makeGetPageById();
  const getPageSettingsByPageIdUseCase = makeGetPageSettingsByPageId();

  return new GetPageSettingsByPageIdController(
    getPageByIdUseCase,
    getPageSettingsByPageIdUseCase
  );
};
