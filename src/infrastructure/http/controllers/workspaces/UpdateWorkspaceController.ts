import { WorkspaceNotFoundError } from '@application/errors/WorkspaceNotFoundError';
import { UpdateWorkspaceInterface } from '@application/interfaces/use-cases/workspaces/UpdateWorkspaceInterface';
import { HttpRequest } from '@infrastructure/http/interfaces/HttpRequest';
import { HttpResponse } from '@infrastructure/http/interfaces/HttpResponse';
import { BaseController } from '@infrastructure/http/controllers/BaseController';
import { Validation } from '@infrastructure/http/interfaces/Validation';
import { GetWorkspaceByIdInterface } from '@application/interfaces/use-cases/workspaces/GetWorkspaceByIdInterface';
import { notFound, ok } from '@infrastructure/http/helpers/http';

export namespace UpdateWorkspaceController {
  export type Request = HttpRequest<
    UpdateWorkspaceInterface.WorkspaceDataType,
    { workspaceId: string }
  >;
  export type Response = HttpResponse<
    UpdateWorkspaceInterface.Response | WorkspaceNotFoundError
  >;
}

export class UpdateWorkspaceController extends BaseController {
  constructor(
    private readonly updateWorkspaceValidation: Validation,
    private readonly getWorkspaceById: GetWorkspaceByIdInterface,
    private readonly updateWorkspace: UpdateWorkspaceInterface
  ) {
    super(updateWorkspaceValidation);
  }

  async execute(
    httpRequest: UpdateWorkspaceController.Request
  ): Promise<UpdateWorkspaceController.Response> {
    const { workspaceId } = httpRequest.params!;
    const workspaceData = httpRequest.body!;

    const WorkspaceOrError = await this.getWorkspaceById.execute(workspaceId);

    if (WorkspaceOrError instanceof WorkspaceNotFoundError) {
      return notFound(WorkspaceOrError);
    }

    const updateWorkspaceOrError = await this.updateWorkspace.execute({
      workspaceId,
      workspaceData,
    });

    if (updateWorkspaceOrError instanceof WorkspaceNotFoundError) {
      return notFound(updateWorkspaceOrError);
    }

    return ok(updateWorkspaceOrError);
  }
}
