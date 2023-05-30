import { PageNotFoundError } from '@application/errors/PageNotFoundError';
import { UseCase } from '@application/interfaces/use-cases/UseCase';

export namespace AddToFavoriteInterface {
  export type Request = {
    pageId: string;
    userId: string;
  };
  export type Response = void | PageNotFoundError;
}

export interface AddToFavoriteInterface
  extends UseCase<
    AddToFavoriteInterface.Request,
    AddToFavoriteInterface.Response
  > {
  execute(
    params: AddToFavoriteInterface.Request
  ): Promise<AddToFavoriteInterface.Response>;
}
