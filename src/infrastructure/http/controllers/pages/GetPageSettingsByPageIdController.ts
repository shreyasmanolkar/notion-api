import { GetPageSettingsByPageIdInterface } from '@application/interfaces/use-cases/pages/getPageSettingsByPageIdInterface';
import { HttpRequest } from '@infrastructure/http/interfaces/HttpRequest';
import { HttpResponse } from '@infrastructure/http/interfaces/HttpResponse';
import { BaseController } from '@infrastructure/http/controllers/BaseController';
import { GetPageByIdInterface } from '@application/interfaces/use-cases/pages/getPageByIdInterface';
import { PageNotFoundError } from '@application/errors/PageNotFoundError';
import { notFound, ok } from '@infrastructure/http/helpers/http';

export namespace GetPageSettingsByPageIdController {
  export type Request = HttpRequest<undefined, { pageId: string }>;
  export type Response =
    HttpResponse<GetPageSettingsByPageIdInterface.Response>;
}

export class GetPageSettingsByPageIdController extends BaseController {
  constructor(
    private readonly getPageById: GetPageByIdInterface,
    private readonly getPageSettingsByPageId: GetPageSettingsByPageIdInterface
  ) {
    super();
  }

  async execute(
    httpRequest: GetPageSettingsByPageIdController.Request
  ): Promise<GetPageSettingsByPageIdController.Response> {
    const { pageId } = httpRequest.params!;
    const pageOrError = await this.getPageById.execute(pageId);

    if (pageOrError instanceof PageNotFoundError) {
      return notFound(pageOrError);
    }

    const pageSettings = await this.getPageSettingsByPageId.execute(pageId);

    return ok(pageSettings);
  }
}
