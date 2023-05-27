import { PageNotFoundError } from '@application/errors/PageNotFoundError';
import { HttpRequest } from '@infrastructure/http/interfaces/HttpRequest';
import { HttpResponse } from '@infrastructure/http/interfaces/HttpResponse';
import { BaseController } from '@infrastructure/http/controllers/BaseController';
import { GetPageByIdInterface } from '@application/interfaces/use-cases/pages/getPageByIdInterface';
import { RemoveFromFavoriteInterface } from '@application/interfaces/use-cases/pages/removeFromFavoriteInterface';
import { noContent, notFound } from '@infrastructure/http/helpers/http';

export namespace RemoveFromFavoriteController {
  export type Request = HttpRequest<
    undefined,
    { pageId: string; userId: string }
  >;
  export type Response = HttpResponse<undefined | PageNotFoundError>;
}

export class RemoveFromFavoriteController extends BaseController {
  constructor(
    private readonly getPageById: GetPageByIdInterface,
    private readonly removeFromFavorite: RemoveFromFavoriteInterface
  ) {
    super();
  }

  async execute(
    httpRequest: RemoveFromFavoriteController.Request
  ): Promise<RemoveFromFavoriteController.Response> {
    const { pageId, userId } = httpRequest.params!;

    const pageOrError = await this.getPageById.execute(pageId);

    if (pageOrError instanceof PageNotFoundError) {
      return notFound(pageOrError);
    }

    await this.removeFromFavorite.execute({
      pageId,
      userId,
    });

    return noContent();
  }
}
