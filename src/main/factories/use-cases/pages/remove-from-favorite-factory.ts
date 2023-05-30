import { RemoveFromFavoriteInterface } from '@application/interfaces/use-cases/pages/removeFromFavoriteInterface';
import { RemoveFromFavorite } from '@application/use-cases/pages/RemoveFromFavorite';
import { PageRepository } from '@infrastructure/db/mongodb/repositories/PageRepository';

export const makeRemoveFromFavorite = (): RemoveFromFavoriteInterface => {
  const pageRepository = new PageRepository();

  return new RemoveFromFavorite(pageRepository, pageRepository);
};
