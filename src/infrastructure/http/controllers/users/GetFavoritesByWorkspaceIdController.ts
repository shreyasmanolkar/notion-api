import { GetFavoritesByWorkspaceIdInterface } from '@application/interfaces/use-cases/users/GetFavoritesByWorkspaceIdInterface';
import { HttpRequest } from '@infrastructure/http/interfaces/HttpRequest';
import { HttpResponse } from '@infrastructure/http/interfaces/HttpResponse';
import { BaseController } from '@infrastructure/http/controllers/BaseController';
import { GetWorkspacesByUserIdInterface } from '@application/interfaces/use-cases/users/GetWorkspacesByUserIdInterface';
import { forbidden, ok } from '@infrastructure/http/helpers/http';
import { PermissionError } from '@infrastructure/http/errors/PermissionError';

export namespace GetFavoritesByWorkspaceIdController {
  export type Request = HttpRequest<
    undefined,
    { userId: string; workspaceId: string }
  >;
  export type Response = HttpResponse<
    GetFavoritesByWorkspaceIdInterface.Response | PermissionError
  >;
}

export class GetFavoritesByWorkspaceIdController extends BaseController {
  constructor(
    private readonly getWorkspacesByUserId: GetWorkspacesByUserIdInterface,
    private readonly getFavoritesByWorkspaceId: GetFavoritesByWorkspaceIdInterface
  ) {
    super();
  }

  async execute(
    httpRequest: GetFavoritesByWorkspaceIdController.Request
  ): Promise<GetFavoritesByWorkspaceIdController.Response> {
    const { userId, workspaceId } = httpRequest.params!;

    const workspaces = await this.getWorkspacesByUserId.execute(userId);

    const verifiedWorkspace = workspaces?.find(
      workspace => workspace.workspaceId === workspaceId
    );

    if (!verifiedWorkspace) {
      return forbidden(new PermissionError());
    }

    const response = await this.getFavoritesByWorkspaceId.execute({
      userId,
      workspaceId,
    });

    return ok(response);
  }
}
