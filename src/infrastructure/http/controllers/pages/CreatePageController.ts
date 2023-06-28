import { CreatePageInterface } from '@application/interfaces/use-cases/pages/createPageInterface';
import { HttpRequest } from '@infrastructure/http/interfaces/HttpRequest';
import { HttpResponse } from '@infrastructure/http/interfaces/HttpResponse';
import { BaseController } from '@infrastructure/http/controllers/BaseController';
import { Validation } from '@infrastructure/http/interfaces/Validation';
import { created, forbidden } from '@infrastructure/http/helpers/http';
import { GetPageByIdInterface } from '@application/interfaces/use-cases/pages/getPageByIdInterface';
import { PageNotFoundError } from '@application/errors/PageNotFoundError';
import { AddPageInterface } from '@application/interfaces/use-cases/workspaces/AddPageInterface';
import { AddPageIdToFavoritesByWorkspaceIdInterface } from '@application/interfaces/use-cases/users/AddPageIdToFavoritesByWorkspaceIdInterface';

export namespace CreatePageController {
  export type Request = HttpRequest<CreatePageInterface.Request>;
  export type Response = HttpResponse<{ id: string } | PageNotFoundError>;
}

export class CreatePageController extends BaseController {
  constructor(
    private readonly createPageValidation: Validation,
    private readonly createPage: CreatePageInterface,
    private readonly getPageById: GetPageByIdInterface,
    private readonly addPage: AddPageInterface,
    private readonly addPageIdToFavoritesByWorkspaceId: AddPageIdToFavoritesByWorkspaceIdInterface
  ) {
    super(createPageValidation);
  }

  async execute(
    httpRequest: CreatePageController.Request
  ): Promise<CreatePageController.Response> {
    const {
      title,
      icon,
      coverPicture,
      content,
      favorite,
      pageSettings,
      path,
      workspaceId,
    } = httpRequest.body!;

    const userId = favorite[0];

    const id = await this.createPage.execute({
      title,
      icon,
      coverPicture,
      content,
      favorite,
      pageSettings,
      path,
      workspaceId,
    });

    const pageOrError = await this.getPageById.execute(id);

    if (pageOrError instanceof PageNotFoundError) {
      return forbidden(pageOrError);
    }

    const { reference, createdAt } = pageOrError;

    await this.addPage.execute({
      workspaceId,
      pageData: {
        id,
        reference,
        path,
        icon,
        title,
        createdAt,
      },
    });

    if (userId) {
      await this.addPageIdToFavoritesByWorkspaceId.execute({
        userId,
        workspaceId,
        pageId: id,
      });
    }

    return created({ id });
  }
}
