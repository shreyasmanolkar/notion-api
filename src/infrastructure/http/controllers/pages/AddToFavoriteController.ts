import { PageNotFoundError } from '@application/errors/PageNotFoundError';
import { AddToFavoriteInterface } from '@application/interfaces/use-cases/pages/addToFavoriteInterface';
import { GetPageByIdInterface } from '@application/interfaces/use-cases/pages/getPageByIdInterface';
import { AddPageIdToFavoritesByWorkspaceIdInterface } from '@application/interfaces/use-cases/users/AddPageIdToFavoritesByWorkspaceIdInterface';
import { BaseController } from '@infrastructure/http/controllers/BaseController';
import { noContent, notFound } from '@infrastructure/http/helpers/http';
import { HttpRequest } from '@infrastructure/http/interfaces/HttpRequest';
import { HttpResponse } from '@infrastructure/http/interfaces/HttpResponse';

export namespace AddToFavoriteController {
  export type Request = HttpRequest<undefined, { pageId: string }> & {
    userId: string;
  } & { workspaceId: string };
  export type Response = HttpResponse<
    AddToFavoriteInterface.Response | PageNotFoundError
  >;
}

export class AddToFavoriteController extends BaseController {
  constructor(
    private readonly getPageById: GetPageByIdInterface,
    private readonly addToFavorite: AddToFavoriteInterface,
    private readonly addPageIdToFavoritesByWorkspaceId: AddPageIdToFavoritesByWorkspaceIdInterface
  ) {
    super();
  }

  async execute(
    httpRequest: AddToFavoriteController.Request
  ): Promise<AddToFavoriteController.Response> {
    const { pageId } = httpRequest.params!;
    const userId = httpRequest.userId!;
    const workspaceId = httpRequest.workspaceId!;

    const pageOrError = await this.getPageById.execute(pageId);

    if (pageOrError instanceof PageNotFoundError) {
      return notFound(pageOrError);
    }

    await this.addToFavorite.execute({
      pageId,
      userId,
    });

    await this.addPageIdToFavoritesByWorkspaceId.execute({
      userId,
      workspaceId,
      pageId,
    });

    return noContent();
  }
}
