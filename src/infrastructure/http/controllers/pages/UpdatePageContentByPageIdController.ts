import { PageNotFoundError } from '@application/errors/PageNotFoundError';
import { HttpRequest } from '@infrastructure/http/interfaces/HttpRequest';
import { HttpResponse } from '@infrastructure/http/interfaces/HttpResponse';
import { BaseController } from '@infrastructure/http/controllers/BaseController';
import { Validation } from '@infrastructure/http/interfaces/Validation';
import { GetPageByIdInterface } from '@application/interfaces/use-cases/pages/getPageByIdInterface';
import { UpdatePageContentByPageIdInterface } from '@application/interfaces/use-cases/pages/updatePageContentByPageIdInterface';
import { noContent, notFound } from '@infrastructure/http/helpers/http';

export namespace UpdatePageContentByPageIdController {
  export type Request = HttpRequest<{ content: never }, { pageId: string }>;
  export type Response = HttpResponse<undefined | PageNotFoundError>;
}

export class UpdatePageContentByPageIdController extends BaseController {
  constructor(
    private readonly updatePageContentByPageIdValidation: Validation,
    private readonly getPageById: GetPageByIdInterface,
    private readonly updatePageContentByPageId: UpdatePageContentByPageIdInterface
  ) {
    super(updatePageContentByPageIdValidation);
  }

  async execute(
    httpRequest: UpdatePageContentByPageIdController.Request
  ): Promise<UpdatePageContentByPageIdController.Response> {
    const { pageId } = httpRequest.params!;
    const { content } = httpRequest.body!;

    const pageOrError = await this.getPageById.execute(pageId);

    if (pageOrError instanceof PageNotFoundError) {
      return notFound(pageOrError);
    }

    await this.updatePageContentByPageId.execute({
      pageId,
      content,
    });

    return noContent();
  }
}
