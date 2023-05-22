import { PermissionError } from '@infrastructure/http/errors/PermissionError';
import { HttpRequest } from '@infrastructure/http/interfaces/HttpRequest';
import { HttpResponse } from '@infrastructure/http/interfaces/HttpResponse';
import { BaseController } from '@infrastructure/http/controllers/BaseController';
import { RemoveWorkspaceByUserIdInterface } from '@application/interfaces/use-cases/users/RemoveWorkspaceByUserIdInterface';
import { GetWorkspacesByUserIdInterface } from '@application/interfaces/use-cases/users/GetWorkspacesByUserIdInterface';
import { forbidden, noContent } from '@infrastructure/http/helpers/http';

export namespace RemoveWorkspaceByUserIdController {
  export type Request = HttpRequest<
    undefined,
    { userId: string; workspaceId: string }
  >;
  export type Response = HttpResponse<undefined | PermissionError>;
}

export class RemoveWorkspaceByUserIdController extends BaseController {
  constructor(
    private readonly getWorkspacesByUserId: GetWorkspacesByUserIdInterface,
    private readonly removeWorkspaceByUserId: RemoveWorkspaceByUserIdInterface
  ) {
    super();
  }

  async execute(
    httpRequest: RemoveWorkspaceByUserIdController.Request
  ): Promise<RemoveWorkspaceByUserIdController.Response> {
    const { userId, workspaceId } = httpRequest.params!;

    const workspaces = await this.getWorkspacesByUserId.execute(userId);

    const verifiedWorkspace = workspaces.find(
      workspace => workspace.workspaceId === workspaceId
    );

    if (!verifiedWorkspace) {
      return forbidden(new PermissionError());
    }

    await this.removeWorkspaceByUserId.execute({
      userId,
      workspaceId,
    });

    return noContent();
  }
}
