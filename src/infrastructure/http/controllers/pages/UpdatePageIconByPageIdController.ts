import { PageNotFoundError } from '@application/errors/PageNotFoundError';
import { GetPageByIdInterface } from '@application/interfaces/use-cases/pages/getPageByIdInterface';
import { UpdatePageIconByPageIdInterface } from '@application/interfaces/use-cases/pages/updatePageIconByPageIdInterface';
import { UpdateWorkspacePagesMetaDataByPageIdInterface } from '@application/interfaces/use-cases/workspaces/UpdateWorkspacePagesMetaDataByPageIdInterface';
import { BaseController } from '@infrastructure/http/controllers/BaseController';
import { noContent, notFound } from '@infrastructure/http/helpers/http';
import { HttpRequest } from '@infrastructure/http/interfaces/HttpRequest';
import { HttpResponse } from '@infrastructure/http/interfaces/HttpResponse';
import { Validation } from '@infrastructure/http/interfaces/Validation';

export namespace UpdatePageIconByPageIdController {
  export type Request = HttpRequest<{ icon: string }, { pageId: string }>;
  export type Response = HttpResponse<undefined | PageNotFoundError>;
}

export class UpdatePageIconByPageIdController extends BaseController {
  constructor(
    private readonly updatePageIconByPageIdValidation: Validation,
    private readonly getPageById: GetPageByIdInterface,
    private readonly updatePageIconByPageId: UpdatePageIconByPageIdInterface,
    private readonly updateWorkspacePagesMetaDataByPageIdInterface: UpdateWorkspacePagesMetaDataByPageIdInterface
  ) {
    super(updatePageIconByPageIdValidation);
  }

  async execute(
    httpRequest: UpdatePageIconByPageIdController.Request
  ): Promise<UpdatePageIconByPageIdController.Response> {
    const { pageId } = httpRequest.params!;
    const { icon } = httpRequest.body!;

    const pageOrError = await this.getPageById.execute(pageId);

    if (pageOrError instanceof PageNotFoundError) {
      return notFound(pageOrError);
    }

    await this.updatePageIconByPageId.execute({
      pageId,
      icon,
    });

    await this.updateWorkspacePagesMetaDataByPageIdInterface.execute({
      workspaceId: pageOrError.workspaceId,
      pageId,
      pageData: {
        icon,
      },
    });

    return noContent();
  }
}
