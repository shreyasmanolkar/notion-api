import { WorkspaceNotFoundError } from '@application/errors/WorkspaceNotFoundError';
import { HttpRequest } from '@infrastructure/http/interfaces/HttpRequest';
import { HttpResponse } from '@infrastructure/http/interfaces/HttpResponse';
import { BaseController } from '@infrastructure/http/controllers/BaseController';
import { GetWorkspaceByIdInterface } from '@application/interfaces/use-cases/workspaces/GetWorkspaceByIdInterface';
import { DeletePagesByWorkspaceIdInterface } from '@application/interfaces/use-cases/pages/deletePagesByWorkspaceIdInterface';
import { noContent, notFound } from '@infrastructure/http/helpers/http';

export namespace DeletePagesByWorkspaceIdController {
  export type Request = HttpRequest<undefined, { workspaceId: string }>;
  export type Response = HttpResponse<undefined | WorkspaceNotFoundError>;
}

export class DeletePagesByWorkspaceIdController extends BaseController {
  constructor(
    private readonly getWorkspaceById: GetWorkspaceByIdInterface,
    private readonly deletePagesByWorkspaceId: DeletePagesByWorkspaceIdInterface
  ) {
    super();
  }

  async execute(
    httpRequest: DeletePagesByWorkspaceIdController.Request
  ): Promise<DeletePagesByWorkspaceIdController.Response> {
    const { workspaceId } = httpRequest.params!;

    const workspaceOrError = await this.getWorkspaceById.execute(workspaceId);

    if (workspaceOrError instanceof WorkspaceNotFoundError) {
      return notFound(workspaceOrError);
    }

    await this.deletePagesByWorkspaceId.execute(workspaceId);

    return noContent();
  }
}
