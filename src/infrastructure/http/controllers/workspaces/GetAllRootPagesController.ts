import { GetAllRootPagesInterface } from '@application/interfaces/use-cases/workspaces/GetAllRootPagesInterface';
import { HttpRequest } from '@infrastructure/http/interfaces/HttpRequest';
import { HttpResponse } from '@infrastructure/http/interfaces/HttpResponse';
import { BaseController } from '@infrastructure/http/controllers/BaseController';
import { GetWorkspaceByIdInterface } from '@application/interfaces/use-cases/workspaces/GetWorkspaceByIdInterface';
import { WorkspaceNotFoundError } from '@application/errors/WorkspaceNotFoundError';
import { notFound, ok } from '@infrastructure/http/helpers/http';

export namespace GetAllRootPagesController {
  export type Request = HttpRequest<undefined, { workspaceId: string }>;
  export type Response = HttpResponse<GetAllRootPagesInterface.Response>;
}

export class GetAllRootPagesController extends BaseController {
  constructor(
    private readonly getWorkspaceById: GetWorkspaceByIdInterface,
    private readonly getAllRootPages: GetAllRootPagesInterface
  ) {
    super();
  }

  async execute(
    httpRequest: GetAllRootPagesController.Request
  ): Promise<GetAllRootPagesController.Response> {
    const { workspaceId } = httpRequest.params!;

    const workspaceOrError = await this.getWorkspaceById.execute(workspaceId);

    if (workspaceOrError instanceof WorkspaceNotFoundError) {
      return notFound(workspaceOrError);
    }

    const response = await this.getAllRootPages.execute(workspaceId);

    return ok(response);
  }
}
