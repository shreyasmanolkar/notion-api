import { GetAllMembersByWorkspaceIdInterface } from '@application/interfaces/use-cases/workspaces/GetAllMembersByWorkspaceIdInterface';
import { HttpRequest } from '@infrastructure/http/interfaces/HttpRequest';
import { HttpResponse } from '@infrastructure/http/interfaces/HttpResponse';
import { BaseController } from '@infrastructure/http/controllers/BaseController';
import { GetWorkspaceByIdInterface } from '@application/interfaces/use-cases/workspaces/GetWorkspaceByIdInterface';
import { WorkspaceNotFoundError } from '@application/errors/WorkspaceNotFoundError';
import { notFound, ok } from '@infrastructure/http/helpers/http';

export namespace GetAllMembersByWorkspaceIdController {
  export type Request = HttpRequest<undefined, { workspaceId: string }>;
  export type Response =
    HttpResponse<GetAllMembersByWorkspaceIdInterface.Response>;
}

export class GetAllMembersByWorkspaceIdController extends BaseController {
  constructor(
    private readonly getWorkspaceById: GetWorkspaceByIdInterface,
    private readonly getAllMembersByWorkspaceId: GetAllMembersByWorkspaceIdInterface
  ) {
    super();
  }

  async execute(
    httpRequest: GetAllMembersByWorkspaceIdController.Request
  ): Promise<GetAllMembersByWorkspaceIdController.Response> {
    const { workspaceId } = httpRequest.params!;

    const workspaceOrError = await this.getWorkspaceById.execute(workspaceId);

    if (workspaceOrError instanceof WorkspaceNotFoundError) {
      return notFound(workspaceOrError);
    }

    const response = await this.getAllMembersByWorkspaceId.execute(workspaceId);

    return ok(response);
  }
}
