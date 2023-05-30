import { Page } from '@domain/entities/Page';

export namespace RemoveFromFavoriteRepository {
  export type Request = {
    pageId: string;
    userId: string;
  };
  export type Response = Page;
}

export interface RemoveFromFavoriteRepository {
  removeFromFavorite(
    params: RemoveFromFavoriteRepository.Request
  ): Promise<RemoveFromFavoriteRepository.Response>;
}
