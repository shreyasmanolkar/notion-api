import { BaseController } from '@infrastructure/http/controllers/BaseController';
import { UpdatePageTitleByPageIdController } from '@infrastructure/http/controllers/pages/UpdatePageTitleByPageIdController';
import { makeUpdatePageTitleByPageIdValidation } from '@main/factories/controllers/pages/update-page-title-by-page-id/validation-factory';
import { makeGetPageById } from '@main/factories/use-cases/pages/get-page-by-id-factory';
import { makeGetPageIdsByPath } from '@main/factories/use-cases/pages/get-page-ids-by-path';
import { makeUpdatePagePathByPageId } from '@main/factories/use-cases/pages/update-page-path-by-page-id';
import { makeUpdatePageTitleByPageId } from '@main/factories/use-cases/pages/update-page-title-by-page-id-factory';
import { makeUpdateWorkspacePagesMetaDataByWorkspaceId } from '@main/factories/use-cases/workspaces/update-workspace-pages-meta-data-by-page-id-factory';

export const makeUpdatePageTitleByPageIdController = (): BaseController => {
  const validation = makeUpdatePageTitleByPageIdValidation();
  const getPageByIdUseCase = makeGetPageById();
  const getPageIdsByPathUseCase = makeGetPageIdsByPath();
  const updatePageTitleByPageIdUseCase = makeUpdatePageTitleByPageId();
  const updatePagePathByPageIdUseCase = makeUpdatePagePathByPageId();
  const updateWorkspacePagesMetaDataByWorkspaceIdUseCase =
    makeUpdateWorkspacePagesMetaDataByWorkspaceId();

  return new UpdatePageTitleByPageIdController(
    validation,
    getPageByIdUseCase,
    getPageIdsByPathUseCase,
    updatePageTitleByPageIdUseCase,
    updatePagePathByPageIdUseCase,
    updateWorkspacePagesMetaDataByWorkspaceIdUseCase
  );
};
