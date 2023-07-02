import { PageNotFoundError } from '@application/errors/PageNotFoundError';
import { HttpRequest } from '@infrastructure/http/interfaces/HttpRequest';
import { HttpResponse } from '@infrastructure/http/interfaces/HttpResponse';
import { BaseController } from '@infrastructure/http/controllers/BaseController';
import { Validation } from '@infrastructure/http/interfaces/Validation';
import { GetPageByIdInterface } from '@application/interfaces/use-cases/pages/getPageByIdInterface';
import { UpdatePageCoverByPageIdInterface } from '@application/interfaces/use-cases/pages/updatePageCoverByPageIdInterface';
import { noContent, notFound } from '@infrastructure/http/helpers/http';

export namespace UpdatePageCoverByPageIdController {
  export type Request = HttpRequest<
    { url: string; verticalPosition: number },
    { pageId: string }
  >;
  export type Response = HttpResponse<undefined | PageNotFoundError>;
}

export class UpdatePageCoverByPageIdController extends BaseController {
  constructor(
    private readonly updatePageCoverByPageIdValidation: Validation,
    private readonly getPageById: GetPageByIdInterface,
    private readonly updatePageCoverByPageId: UpdatePageCoverByPageIdInterface
  ) {
    super(updatePageCoverByPageIdValidation);
  }

  async execute(
    httpRequest: UpdatePageCoverByPageIdController.Request
  ): Promise<UpdatePageCoverByPageIdController.Response> {
    const { pageId } = httpRequest.params!;
    const { url, verticalPosition } = httpRequest.body!;

    const pageOrError = await this.getPageById.execute(pageId);

    if (pageOrError instanceof PageNotFoundError) {
      return notFound(pageOrError);
    }

    await this.updatePageCoverByPageId.execute({
      pageId,
      url,
      verticalPosition,
    });

    return noContent();
  }
}
