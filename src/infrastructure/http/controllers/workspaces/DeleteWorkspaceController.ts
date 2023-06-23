import { WorkspaceNotFoundError } from '@application/errors/WorkspaceNotFoundError';
import { HttpRequest } from '@infrastructure/http/interfaces/HttpRequest';
import { HttpResponse } from '@infrastructure/http/interfaces/HttpResponse';
import { BaseController } from '@infrastructure/http/controllers/BaseController';
import { noContent, notFound } from '@infrastructure/http/helpers/http';
import { GetWorkspaceByIdInterface } from '@application/interfaces/use-cases/workspaces/GetWorkspaceByIdInterface';
import { DeleteWorkspaceInterface } from '@application/interfaces/use-cases/workspaces/DeleteWorkspaceInterface';
import { DeletePagesByWorkspaceIdInterface } from '@application/interfaces/use-cases/pages/deletePagesByWorkspaceIdInterface';
import { RemoveWorkspaceByUserIdInterface } from '@application/interfaces/use-cases/users/RemoveWorkspaceByUserIdInterface';
import { GetAllMembersByWorkspaceIdInterface } from '@application/interfaces/use-cases/workspaces/GetAllMembersByWorkspaceIdInterface';

export namespace DeleteWorkspaceController {
  export type Request = HttpRequest<undefined, { workspaceId: string }>;
  export type Response = HttpResponse<undefined | WorkspaceNotFoundError>;
}

export class DeleteWorkspaceController extends BaseController {
  constructor(
    private readonly getWorkspaceById: GetWorkspaceByIdInterface,
    private readonly deletePagesByWorkspaceId: DeletePagesByWorkspaceIdInterface,
    private readonly deleteWorkspace: DeleteWorkspaceInterface,
    private readonly getAllMembersByWorkspaceId: GetAllMembersByWorkspaceIdInterface,
    private readonly removeWorkspaceByUserId: RemoveWorkspaceByUserIdInterface
  ) {
    super();
  }

  async execute(
    httpRequest: DeleteWorkspaceController.Request
  ): Promise<DeleteWorkspaceController.Response> {
    const { workspaceId } = httpRequest.params!;

    const workspaceOrError = await this.getWorkspaceById.execute(workspaceId);

    if (workspaceOrError instanceof WorkspaceNotFoundError) {
      return notFound(workspaceOrError);
    }

    const membersOrError = await this.getAllMembersByWorkspaceId.execute(
      workspaceId
    );

    if (membersOrError instanceof WorkspaceNotFoundError) {
      return notFound(membersOrError);
    }

    membersOrError?.forEach(member => {
      this.removeWorkspaceByUserId.execute({
        userId: member,
        workspaceId,
      });
    });

    await this.deletePagesByWorkspaceId.execute(workspaceId);

    await this.deleteWorkspace.execute(workspaceId);

    return noContent();
  }
}
