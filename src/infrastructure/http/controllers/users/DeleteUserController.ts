import { UserNotFoundError } from '@application/errors/UserNotFoundError';
import { PermissionError } from '@infrastructure/http/errors/PermissionError';
import { HttpRequest } from '@infrastructure/http/interfaces/HttpRequest';
import { HttpResponse } from '@infrastructure/http/interfaces/HttpResponse';
import { BaseController } from '@infrastructure/http/controllers/BaseController';
import { DeleteUserInterface } from '@application/interfaces/use-cases/users/DeleteUserInterface';
import { noContent } from '@infrastructure/http/helpers/http';
import { GetWorkspacesByUserIdInterface } from '@application/interfaces/use-cases/users/GetWorkspacesByUserIdInterface';
import { GetAllMembersByWorkspaceIdInterface } from '@application/interfaces/use-cases/workspaces/GetAllMembersByWorkspaceIdInterface';
import { RemoveMemberByWorkspaceIdInterface } from '@application/interfaces/use-cases/workspaces/RemoveMemberByWorkspaceIdInterface';
import { DeleteWorkspaceInterface } from '@application/interfaces/use-cases/workspaces/DeleteWorkspaceInterface';
import { WorkspaceNotFoundError } from '@application/errors/WorkspaceNotFoundError';
import { DeletePagesByWorkspaceIdInterface } from '@application/interfaces/use-cases/pages/deletePagesByWorkspaceIdInterface';

export namespace DeleteUserController {
  export type Request = HttpRequest<undefined, { userId: string }>;
  export type Response = HttpResponse<
    undefined | UserNotFoundError | PermissionError | WorkspaceNotFoundError
  >;
}

export class DeleteUserController extends BaseController {
  constructor(
    private readonly deleteUser: DeleteUserInterface,
    private readonly getWorkspacesByUserId: GetWorkspacesByUserIdInterface,
    private readonly getAllMembersByWorkspaceId: GetAllMembersByWorkspaceIdInterface,
    private readonly removeMemberByWorkspaceId: RemoveMemberByWorkspaceIdInterface,
    private readonly deletePagesByWorkspaceId: DeletePagesByWorkspaceIdInterface,
    private readonly deleteWorkspace: DeleteWorkspaceInterface
  ) {
    super();
  }

  async execute(
    httpRequest: DeleteUserController.Request
  ): Promise<DeleteUserController.Response> {
    const { userId } = httpRequest.params!;

    const workspaces = await this.getWorkspacesByUserId.execute(userId);

    const workspaceIds = workspaces.map(workspace => workspace.workspaceId);

    workspaceIds.forEach(async workspaceId => {
      const workspaceMembers = await this.getAllMembersByWorkspaceId.execute(
        workspaceId
      );

      if ((workspaceMembers as string[]).length > 1) {
        await this.removeMemberByWorkspaceId.execute({
          workspaceId,
          memberId: userId,
        });
      } else {
        await this.deletePagesByWorkspaceId.execute(workspaceId);
        await this.deleteWorkspace.execute(workspaceId);
      }
    });

    await this.deleteUser.execute(userId);
    return noContent();
  }
}
