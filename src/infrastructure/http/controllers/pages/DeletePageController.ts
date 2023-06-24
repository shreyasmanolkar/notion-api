import { PageNotFoundError } from '@application/errors/PageNotFoundError';
import { HttpRequest } from '@infrastructure/http/interfaces/HttpRequest';
import { HttpResponse } from '@infrastructure/http/interfaces/HttpResponse';
import { BaseController } from '@infrastructure/http/controllers/BaseController';
import { GetPageByIdInterface } from '@application/interfaces/use-cases/pages/getPageByIdInterface';
import { DeletePageInterface } from '@application/interfaces/use-cases/pages/deletePageInterface';
import { noContent, notFound } from '@infrastructure/http/helpers/http';
import { RemovePageByPageIdInterface } from '@application/interfaces/use-cases/workspaces/RemovePageByPageIdInterface';

export namespace DeletePageController {
  export type Request = HttpRequest<undefined, { pageId: string }>;
  export type Response = HttpResponse<undefined | PageNotFoundError>;
}

export class DeletePageController extends BaseController {
  constructor(
    private readonly getPageById: GetPageByIdInterface,
    private readonly deletePage: DeletePageInterface,
    private readonly removePageByPageId: RemovePageByPageIdInterface
  ) {
    super();
  }

  async execute(
    httpRequest: DeletePageController.Request
  ): Promise<DeletePageController.Response> {
    const { pageId } = httpRequest.params!;

    const pageOrError = await this.getPageById.execute(pageId);

    if (pageOrError instanceof PageNotFoundError) {
      return notFound(pageOrError);
    }

    await this.removePageByPageId.execute({
      workspaceId: pageOrError.workspaceId,
      pageId,
    });

    await this.deletePage.execute(pageId);

    return noContent();
  }
}
