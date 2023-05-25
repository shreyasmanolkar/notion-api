import { HttpRequest } from '@infrastructure/http/interfaces/HttpRequest';
import { AddPageInterface } from '@application/interfaces/use-cases/workspaces/AddPageInterface';
import { PageType } from '@domain/entities/Workspace';
import { HttpResponse } from '@infrastructure/http/interfaces/HttpResponse';
import { WorkspaceNotFoundError } from '@application/errors/WorkspaceNotFoundError';
import { BaseController } from '@infrastructure/http/controllers/BaseController';
import { Validation } from '@infrastructure/http/interfaces/Validation';
import { GetWorkspaceByIdInterface } from '@application/interfaces/use-cases/workspaces/GetWorkspaceByIdInterface';
import { noContent, notFound } from '@infrastructure/http/helpers/http';

export namespace AddPageController {
  export type Request = HttpRequest<PageType, { workspaceId: string }>;
  export type Response = HttpResponse<void | WorkspaceNotFoundError>;
}

export class AddPageController extends BaseController {
  constructor(
    private readonly addPageValidation: Validation,
    private readonly getWorkspaceById: GetWorkspaceByIdInterface,
    private readonly addPage: AddPageInterface
  ) {
    super(addPageValidation);
  }

  async execute(
    httpRequest: AddPageController.Request
  ): Promise<AddPageController.Response> {
    const { workspaceId } = httpRequest.params!;
    const pageData = httpRequest.body!;

    const workspaceOrError = await this.getWorkspaceById.execute(workspaceId);

    if (workspaceOrError instanceof WorkspaceNotFoundError) {
      return notFound(workspaceOrError);
    }

    await this.addPage.execute({ workspaceId, pageData });

    return noContent();
  }
}
