import { BaseController } from '@infrastructure/http/controllers/BaseController';
import { AddToFavoriteController } from '@infrastructure/http/controllers/pages/AddToFavoriteController';
import { makeAddToFavorite } from '@main/factories/use-cases/pages/add-to-favorite-factory';
import { makeGetPageById } from '@main/factories/use-cases/pages/get-page-by-id-factory';
import { makeAddPageIdToFavoritesByWorkspaceId } from '@main/factories/use-cases/users/add-page-id-to-favorites-by-workspace-id-factory';

export const makeAddToFavoriteController = (): BaseController => {
  const getPageByIdUseCase = makeGetPageById();
  const addToFavotireUseCase = makeAddToFavorite();
  const addPageIdToFavoritesByWorkspaceIdUseCase =
    makeAddPageIdToFavoritesByWorkspaceId();

  return new AddToFavoriteController(
    getPageByIdUseCase,
    addToFavotireUseCase,
    addPageIdToFavoritesByWorkspaceIdUseCase
  );
};
