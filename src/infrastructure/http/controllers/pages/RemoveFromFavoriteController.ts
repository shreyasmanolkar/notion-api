import { PageNotFoundError } from '@application/errors/PageNotFoundError';
import { HttpRequest } from '@infrastructure/http/interfaces/HttpRequest';
import { HttpResponse } from '@infrastructure/http/interfaces/HttpResponse';
import { BaseController } from '@infrastructure/http/controllers/BaseController';
import { GetPageByIdInterface } from '@application/interfaces/use-cases/pages/getPageByIdInterface';
import { RemoveFromFavoriteInterface } from '@application/interfaces/use-cases/pages/removeFromFavoriteInterface';
import { noContent, notFound } from '@infrastructure/http/helpers/http';
import { RemovePageIdFromFavoritesByWorkspaceIdInterface } from '@application/interfaces/use-cases/users/RemovePageIdFromFavoritesByWorkspaceIdInterface';

export namespace RemoveFromFavoriteController {
  export type Request = HttpRequest<
    undefined,
    { pageId: string; userId: string }
  > & { userId: string } & { workspaceId: string };
  export type Response = HttpResponse<undefined | PageNotFoundError>;
}

export class RemoveFromFavoriteController extends BaseController {
  constructor(
    private readonly getPageById: GetPageByIdInterface,
    private readonly removeFromFavorite: RemoveFromFavoriteInterface,
    private readonly removePageIdFromFavoritesByWorkspaceId: RemovePageIdFromFavoritesByWorkspaceIdInterface
  ) {
    super();
  }

  async execute(
    httpRequest: RemoveFromFavoriteController.Request
  ): Promise<RemoveFromFavoriteController.Response> {
    const { pageId } = httpRequest.params!;
    const userId = httpRequest.userId!;
    const workspaceId = httpRequest.workspaceId!;

    const pageOrError = await this.getPageById.execute(pageId);

    if (pageOrError instanceof PageNotFoundError) {
      return notFound(pageOrError);
    }

    await this.removePageIdFromFavoritesByWorkspaceId.execute({
      userId,
      workspaceId,
      pageId,
    });

    await this.removeFromFavorite.execute({
      pageId,
      userId,
    });

    return noContent();
  }
}
