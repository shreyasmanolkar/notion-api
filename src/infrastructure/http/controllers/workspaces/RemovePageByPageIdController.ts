import { WorkspaceNotFoundError } from '@application/errors/WorkspaceNotFoundError';
import { GetWorkspaceByIdInterface } from '@application/interfaces/use-cases/workspaces/GetWorkspaceByIdInterface';
import { HttpRequest } from '@infrastructure/http/interfaces/HttpRequest';
import { HttpResponse } from '@infrastructure/http/interfaces/HttpResponse';
import { BaseController } from '@infrastructure/http/controllers/BaseController';
import { RemovePageByPageIdInterface } from '@application/interfaces/use-cases/workspaces/RemovePageByPageIdInterface';
import { noContent, notFound } from '@infrastructure/http/helpers/http';

export namespace RemovePageByPageIdController {
  export type Request = HttpRequest<
    undefined,
    { workspaceId: string; pageId: string }
  >;
  export type Response = HttpResponse<undefined | WorkspaceNotFoundError>;
}

export class RemovePageByPageIdController extends BaseController {
  constructor(
    private readonly getWorkspaceById: GetWorkspaceByIdInterface,
    private readonly removePageByPageId: RemovePageByPageIdInterface
  ) {
    super();
  }

  async execute(
    httpRequest: RemovePageByPageIdController.Request
  ): Promise<RemovePageByPageIdController.Response> {
    const { workspaceId, pageId } = httpRequest.params!;

    const workspaceOrError = await this.getWorkspaceById.execute(workspaceId);

    if (workspaceOrError instanceof WorkspaceNotFoundError) {
      return notFound(workspaceOrError);
    }

    await this.removePageByPageId.execute({
      workspaceId,
      pageId,
    });

    return noContent();
  }
}
