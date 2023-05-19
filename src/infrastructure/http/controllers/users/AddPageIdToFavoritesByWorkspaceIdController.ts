import { WorkspaceNotFoundError } from '@application/errors/WorkspaceNotFoundError';
import { AddPageIdToFavoritesByWorkspaceIdInterface } from '@application/interfaces/use-cases/users/AddPageIdToFavoritesByWorkspaceIdInterface';
import { PermissionError } from '@infrastructure/http/errors/PermissionError';
import { HttpRequest } from '@infrastructure/http/interfaces/HttpRequest';
import { HttpResponse } from '@infrastructure/http/interfaces/HttpResponse';
import { BaseController } from '@infrastructure/http/controllers/BaseController';
import { GetWorkspacesByUserIdInterface } from '@application/interfaces/use-cases/users/GetWorkspacesByUserIdInterface';
import { forbidden, noContent } from '@infrastructure/http/helpers/http';

export namespace AddPageIdToFavoritesByWorkspaceIdController {
  export type Request = HttpRequest<
    undefined,
    { userId: string; workspaceId: string; pageId: string }
  >;
  export type Response = HttpResponse<
    | AddPageIdToFavoritesByWorkspaceIdInterface.Response
    | WorkspaceNotFoundError
    | PermissionError
  >;
}

export class AddPageIdToFavoritesByWorkspaceIdController extends BaseController {
  constructor(
    private readonly getWorkspacesByUserId: GetWorkspacesByUserIdInterface,
    private readonly addPageIdToFavoritesByWorkspaceId: AddPageIdToFavoritesByWorkspaceIdInterface
  ) {
    super();
  }

  async execute(
    httpRequest: AddPageIdToFavoritesByWorkspaceIdController.Request
  ): Promise<AddPageIdToFavoritesByWorkspaceIdController.Response> {
    const { userId, workspaceId, pageId } = httpRequest.params!;

    const workspaces = await this.getWorkspacesByUserId.execute(userId);

    const verifiedWorkspace = workspaces.find(
      workspace => workspace.workspaceId === workspaceId
    );

    if (!verifiedWorkspace) {
      return forbidden(new PermissionError());
    }

    await this.addPageIdToFavoritesByWorkspaceId.execute({
      userId,
      workspaceId,
      pageId,
    });

    return noContent();
  }
}
