import { WorkspaceNotFoundError } from '@application/errors/WorkspaceNotFoundError';
import { HttpRequest } from '@infrastructure/http/interfaces/HttpRequest';
import { HttpResponse } from '@infrastructure/http/interfaces/HttpResponse';
import { BaseController } from '@infrastructure/http/controllers/BaseController';
import { GetWorkspaceByIdInterface } from '@application/interfaces/use-cases/workspaces/GetWorkspaceByIdInterface';
import { RemoveMemberByWorkspaceIdInterface } from '@application/interfaces/use-cases/workspaces/RemoveMemberByWorkspaceIdInterface';
import { noContent, notFound } from '@infrastructure/http/helpers/http';

export namespace RemoveMemberByWorkspaceIdController {
  export type Request = HttpRequest<
    undefined,
    { workspaceId: string; memberId: string }
  >;
  export type Response = HttpResponse<undefined | WorkspaceNotFoundError>;
}

export class RemoveMemberByWorkspaceIdController extends BaseController {
  constructor(
    private readonly getWorkspaceById: GetWorkspaceByIdInterface,
    private readonly removeMemberByWorkspaceId: RemoveMemberByWorkspaceIdInterface
  ) {
    super();
  }

  async execute(
    httpRequest: RemoveMemberByWorkspaceIdController.Request
  ): Promise<RemoveMemberByWorkspaceIdController.Response> {
    const { workspaceId, memberId } = httpRequest.params!;

    const workspaceOrError = await this.getWorkspaceById.execute(workspaceId);

    if (workspaceOrError instanceof WorkspaceNotFoundError) {
      return notFound(workspaceOrError);
    }

    await this.removeMemberByWorkspaceId.execute({
      workspaceId,
      memberId,
    });

    return noContent();
  }
}
