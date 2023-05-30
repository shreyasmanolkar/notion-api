import { GetPageContentByPageIdInterface } from '@application/interfaces/use-cases/pages/getPageContentByPageIdInterface';
import { HttpRequest } from '@infrastructure/http/interfaces/HttpRequest';
import { HttpResponse } from '@infrastructure/http/interfaces/HttpResponse';
import { BaseController } from '@infrastructure/http/controllers/BaseController';
import { GetPageByIdInterface } from '@application/interfaces/use-cases/pages/getPageByIdInterface';
import { PageNotFoundError } from '@application/errors/PageNotFoundError';
import { notFound, ok } from '@infrastructure/http/helpers/http';

export namespace GetPageContentByPageIdController {
  export type Request = HttpRequest<undefined, { pageId: string }>;
  export type Response = HttpResponse<GetPageContentByPageIdInterface.Response>;
}

export class GetPageContentByPageIdController extends BaseController {
  constructor(
    private readonly getPageById: GetPageByIdInterface,
    private readonly getPageContentByPageId: GetPageContentByPageIdInterface
  ) {
    super();
  }

  async execute(
    httpRequest: GetPageContentByPageIdController.Request
  ): Promise<GetPageContentByPageIdController.Response> {
    const { pageId } = httpRequest.params!;
    const pageOrError = await this.getPageById.execute(pageId);

    if (pageOrError instanceof PageNotFoundError) {
      return notFound(pageOrError);
    }

    const pageContent = await this.getPageContentByPageId.execute(pageId);

    return ok(pageContent);
  }
}
