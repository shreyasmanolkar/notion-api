import { GetPageByIdInterface } from '@application/interfaces/use-cases/pages/getPageByIdInterface';
import { HttpRequest } from '@infrastructure/http/interfaces/HttpRequest';
import { HttpResponse } from '@infrastructure/http/interfaces/HttpResponse';
import { BaseController } from '@infrastructure/http/controllers/BaseController';
import { PageNotFoundError } from '@application/errors/PageNotFoundError';
import { notFound, ok } from '@infrastructure/http/helpers/http';

export namespace GetPageByIdController {
  export type Request = HttpRequest<undefined, { pageId: string }>;
  export type Response = HttpResponse<GetPageByIdInterface.Response>;
}

export class GetPageByIdController extends BaseController {
  constructor(private readonly getPageById: GetPageByIdInterface) {
    super();
  }

  async execute(
    httpRequest: GetPageByIdController.Request
  ): Promise<GetPageByIdController.Response> {
    const { pageId } = httpRequest.params!;
    const pageOrError = await this.getPageById.execute(pageId);

    if (pageOrError instanceof PageNotFoundError) {
      return notFound(pageOrError);
    }

    return ok(pageOrError);
  }
}
