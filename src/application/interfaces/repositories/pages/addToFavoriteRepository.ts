import { Page } from '@domain/entities/Page';

export namespace AddToFavoriteRepository {
  export type Request = {
    pageId: string;
    userId: string;
  };
  export type Response = Page;
}

export interface AddToFavoriteRepository {
  addToFavorite(
    params: AddToFavoriteRepository.Request
  ): Promise<AddToFavoriteRepository.Response>;
}
