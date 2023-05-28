import { BaseController } from '@infrastructure/http/controllers/BaseController';
import { RemoveFromFavoriteController } from '@infrastructure/http/controllers/pages/RemoveFromFavoriteController';
import { makeGetPageById } from '@main/factories/use-cases/pages/get-page-by-id-factory';
import { makeRemoveFromFavorite } from '@main/factories/use-cases/pages/remove-from-favorite-factory';

export const makeRemovePageByPageIdController = (): BaseController => {
  const getPageByIdUseCase = makeGetPageById();
  const removeFromFavoriteUseCase = makeRemoveFromFavorite();

  return new RemoveFromFavoriteController(
    getPageByIdUseCase,
    removeFromFavoriteUseCase
  );
};
