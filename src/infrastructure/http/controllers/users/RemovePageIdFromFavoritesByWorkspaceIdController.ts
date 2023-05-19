import { RemovePageIdFromFavoritesByWorkspaceIdInterface } from '@application/interfaces/use-cases/users/RemovePageIdFromFavoritesByWorkspaceIdInterface';
import { HttpRequest } from '@infrastructure/http/interfaces/HttpRequest';
import { HttpResponse } from '@infrastructure/http/interfaces/HttpResponse';
import { BaseController } from '@infrastructure/http/controllers/BaseController';
import { PermissionError } from '@infrastructure/http/errors/PermissionError';
import { GetWorkspacesByUserIdInterface } from '@application/interfaces/use-cases/users/GetWorkspacesByUserIdInterface';
import { forbidden, noContent } from '@infrastructure/http/helpers/http';

export namespace RemovePageIdFromFavoritesByWorkspaceIdController {
  export type Request = HttpRequest<
    undefined,
    { userId: string; workspaceId: string; pageId: string }
  >;
  export type Response = HttpResponse<undefined | PermissionError>;
}

export class RemovePageIdFromFavoritesByWorkspaceIdController extends BaseController {
  constructor(
    private readonly getWorkspacesByUserId: GetWorkspacesByUserIdInterface,
    private readonly removePageIdFromFavoritesByWorkspaceId: RemovePageIdFromFavoritesByWorkspaceIdInterface
  ) {
    super();
  }

  async execute(
    httpRequest: RemovePageIdFromFavoritesByWorkspaceIdController.Request
  ): Promise<RemovePageIdFromFavoritesByWorkspaceIdController.Response> {
    const { userId, workspaceId, pageId } = httpRequest.params!;

    const workspaces = await this.getWorkspacesByUserId.execute(userId);

    const verifiedWorkspace = workspaces.find(
      workspace => workspace.workspaceId === workspaceId
    );

    if (!verifiedWorkspace) {
      return forbidden(new PermissionError());
    }

    await this.removePageIdFromFavoritesByWorkspaceId.execute({
      userId,
      workspaceId,
      pageId,
    });

    return noContent();
  }
}
