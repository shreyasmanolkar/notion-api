import { PageNotFoundError } from '@application/errors/PageNotFoundError';
import { UseCase } from '@application/interfaces/use-cases/UseCase';

export namespace RemoveFromFavoriteInterface {
  export type Request = {
    pageId: string;
    userId: string;
  };
  export type Response = void | PageNotFoundError;
}

export interface RemoveFromFavoriteInterface
  extends UseCase<
    RemoveFromFavoriteInterface.Request,
    RemoveFromFavoriteInterface.Response
  > {
  execute(
    params: RemoveFromFavoriteInterface.Request
  ): Promise<RemoveFromFavoriteInterface.Response>;
}
