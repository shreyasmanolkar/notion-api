import { PageNotFoundError } from '@application/errors/PageNotFoundError';
import { HttpRequest } from '@infrastructure/http/interfaces/HttpRequest';
import { HttpResponse } from '@infrastructure/http/interfaces/HttpResponse';
import { BaseController } from '@infrastructure/http/controllers/BaseController';
import { Validation } from '@infrastructure/http/interfaces/Validation';
import { GetPageByIdInterface } from '@application/interfaces/use-cases/pages/getPageByIdInterface';
import { UpdatePageTitleByPageIdInterface } from '@application/interfaces/use-cases/pages/updatePageTitleByPageIdInterface';
import { noContent, notFound } from '@infrastructure/http/helpers/http';
import { UpdateWorkspacePagesMetaDataByPageIdInterface } from '@application/interfaces/use-cases/workspaces/UpdateWorkspacePagesMetaDataByPageIdInterface';
import { UpdatePagePathByPageIdInterface } from '@application/interfaces/use-cases/pages/updatePagePathByPageIdInterface';
import { GetPageIdsByPathInterface } from '@application/interfaces/use-cases/pages/getPageIdsByPathInterface';

export namespace UpdatePageTitleByPageIdController {
  export type Request = HttpRequest<{ title: string }, { pageId: string }>;
  export type Response = HttpResponse<undefined | PageNotFoundError>;
}

export class UpdatePageTitleByPageIdController extends BaseController {
  constructor(
    private readonly updatePageTitleByPageIdValidation: Validation,
    private readonly getPageById: GetPageByIdInterface,
    private readonly getPageIdsByPath: GetPageIdsByPathInterface,
    private readonly updatePageTitleByPageId: UpdatePageTitleByPageIdInterface,
    private readonly updatePagePathByPageId: UpdatePagePathByPageIdInterface,
    private readonly updateWorkspacePagesMetaDataByPageIdInterface: UpdateWorkspacePagesMetaDataByPageIdInterface
  ) {
    super(updatePageTitleByPageIdValidation);
  }

  async execute(
    httpRequest: UpdatePageTitleByPageIdController.Request
  ): Promise<UpdatePageTitleByPageIdController.Response> {
    const { pageId } = httpRequest.params!;
    const { title } = httpRequest.body!;

    const pageOrError = await this.getPageById.execute(pageId);

    if (pageOrError instanceof PageNotFoundError) {
      return notFound(pageOrError);
    }

    await this.updatePageTitleByPageId.execute({
      pageId,
      title,
    });

    const previousReference = pageOrError.reference;

    const previousReferenceArray = previousReference.split('-');
    const uniqueId = previousReferenceArray.pop();

    const titleArray = title.split(' ');
    const kebebTitle = titleArray.join('-');

    const reference = `${kebebTitle}-${uniqueId}`;

    await this.updateWorkspacePagesMetaDataByPageIdInterface.execute({
      workspaceId: pageOrError.workspaceId,
      pageId,
      pageData: {
        title,
        reference,
      },
    });

    const childPageIds = await this.getPageIdsByPath.execute(
      `,${previousReference}.`
    );

    if (childPageIds.length > 0) {
      childPageIds.map(async childPageId => {
        await this.updatePagePathByPageId.execute({
          pageId: childPageId,
          path: `,${reference}.`,
        });

        await this.updateWorkspacePagesMetaDataByPageIdInterface.execute({
          workspaceId: pageOrError.workspaceId,
          pageId: childPageId,
          pageData: {
            path: `,${reference}.`,
          },
        });
      });
    }

    return noContent();
  }
}
