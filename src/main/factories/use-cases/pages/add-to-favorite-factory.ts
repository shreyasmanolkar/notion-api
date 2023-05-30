import { AddToFavoriteInterface } from '@application/interfaces/use-cases/pages/addToFavoriteInterface';
import { AddToFavorite } from '@application/use-cases/pages/AddToFavorite';
import { PageRepository } from '@infrastructure/db/mongodb/repositories/PageRepository';

export const makeAddToFavorite = (): AddToFavoriteInterface => {
  const pageRepository = new PageRepository();

  return new AddToFavorite(pageRepository, pageRepository);
};
