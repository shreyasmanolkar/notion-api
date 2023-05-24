import { WorkspaceNotFoundError } from '@application/errors/WorkspaceNotFoundError';
import { AddMemberByWorkspaceIdInterface } from '@application/interfaces/use-cases/workspaces/AddMemberByWorkspaceIdInterface';
import { HttpRequest } from '@infrastructure/http/interfaces/HttpRequest';
import { HttpResponse } from '@infrastructure/http/interfaces/HttpResponse';
import { BaseController } from '@infrastructure/http/controllers/BaseController';
import { GetWorkspaceByIdInterface } from '@application/interfaces/use-cases/workspaces/GetWorkspaceByIdInterface';
import { noContent, notFound } from '@infrastructure/http/helpers/http';

export namespace AddMemberByWorkspaceIdController {
  export type Request = HttpRequest<
    undefined,
    { workspaceId: string; memberId: string }
  >;
  export type Response = HttpResponse<
    AddMemberByWorkspaceIdInterface.Response | WorkspaceNotFoundError
  >;
}

export class AddMemberByWorkspaceIdController extends BaseController {
  constructor(
    private readonly getWorkspaceById: GetWorkspaceByIdInterface,
    private readonly addMemberByWorkspaceId: AddMemberByWorkspaceIdInterface
  ) {
    super();
  }

  async execute(
    httpRequest: AddMemberByWorkspaceIdController.Request
  ): Promise<AddMemberByWorkspaceIdController.Response> {
    const { workspaceId, memberId } = httpRequest.params!;

    const workspaceOrError = await this.getWorkspaceById.execute(workspaceId);

    if (workspaceOrError instanceof WorkspaceNotFoundError) {
      return notFound(workspaceOrError);
    }

    await this.addMemberByWorkspaceId.execute({
      workspaceId,
      memberId,
    });

    return noContent();
  }
}
