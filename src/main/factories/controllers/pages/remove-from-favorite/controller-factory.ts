import { BaseController } from '@infrastructure/http/controllers/BaseController';
import { RemoveFromFavoriteController } from '@infrastructure/http/controllers/pages/RemoveFromFavoriteController';
import { makeGetPageById } from '@main/factories/use-cases/pages/get-page-by-id-factory';
import { makeRemoveFromFavorite } from '@main/factories/use-cases/pages/remove-from-favorite-factory';
import { makeRemovePageIdFromFavoritesByWorkspaceId } from '@main/factories/use-cases/users/remove-page-id-from-favorites-by-workspace-id-factory';

export const makeRemoveFromFavoriteController = (): BaseController => {
  const getPageByIdUseCase = makeGetPageById();
  const removeFromFavoriteUseCase = makeRemoveFromFavorite();
  const removePageIdFromFavoritesByWorkspaceIdUseCase =
    makeRemovePageIdFromFavoritesByWorkspaceId();

  return new RemoveFromFavoriteController(
    getPageByIdUseCase,
    removeFromFavoriteUseCase,
    removePageIdFromFavoritesByWorkspaceIdUseCase
  );
};
