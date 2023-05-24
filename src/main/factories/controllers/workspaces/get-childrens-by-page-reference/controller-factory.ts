import { BaseController } from '@infrastructure/http/controllers/BaseController';
import { GetChildrensByPageReferenceController } from '@infrastructure/http/controllers/workspaces/GetChildrensByPageReferenceController';
import { makeGetChildrensByPageReference } from '@main/factories/use-cases/workspaces/get-childrens-by-page-reference-factory';

export const makeGetChildrensByPageReferenceController = (): BaseController => {
  const getChildrensByPageReferenceUseCase = makeGetChildrensByPageReference();

  return new GetChildrensByPageReferenceController(
    getChildrensByPageReferenceUseCase
  );
};
