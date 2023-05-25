import { GetWorkspaceByIdInterface } from '@application/interfaces/use-cases/workspaces/GetWorkspaceByIdInterface';
import { HttpRequest } from '@infrastructure/http/interfaces/HttpRequest';
import { HttpResponse } from '@infrastructure/http/interfaces/HttpResponse';
import { BaseController } from '@infrastructure/http/controllers/BaseController';
import { notFound, ok } from '@infrastructure/http/helpers/http';
import { WorkspaceNotFoundError } from '@application/errors/WorkspaceNotFoundError';

export namespace GetWorkspaceByIdController {
  export type Request = HttpRequest<undefined, { workspaceId: string }>;
  export type Response = HttpResponse<GetWorkspaceByIdInterface.Response>;
}

export class GetWorkspaceByIdController extends BaseController {
  constructor(private readonly getWorkspaceById: GetWorkspaceByIdInterface) {
    super();
  }

  async execute(
    httpRequest: GetWorkspaceByIdController.Request
  ): Promise<GetWorkspaceByIdController.Response> {
    const { workspaceId } = httpRequest.params!;
    const workspaceOrError = await this.getWorkspaceById.execute(workspaceId);

    if (workspaceOrError instanceof WorkspaceNotFoundError) {
      return notFound(workspaceOrError);
    }

    return ok(workspaceOrError);
  }
}
