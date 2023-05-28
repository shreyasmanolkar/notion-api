import { BaseController } from '@infrastructure/http/controllers/BaseController';
import { AddToFavoriteController } from '@infrastructure/http/controllers/pages/AddToFavoriteController';
import { makeAddToFavorite } from '@main/factories/use-cases/pages/add-to-favorite-factory';
import { makeGetPageById } from '@main/factories/use-cases/pages/get-page-by-id-factory';

export const makeAddToFavoriteController = (): BaseController => {
  const getPageByIdUseCase = makeGetPageById();
  const addToFavotireUseCase = makeAddToFavorite();

  return new AddToFavoriteController(getPageByIdUseCase, addToFavotireUseCase);
};
