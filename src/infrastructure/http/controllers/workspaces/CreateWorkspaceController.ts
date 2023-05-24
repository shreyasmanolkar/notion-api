import { HttpRequest } from '@infrastructure/http/interfaces/HttpRequest';
import { CreateWorkspaceInterface } from '@application/interfaces/use-cases/workspaces/CreateWorkspaceInterface';
import { HttpResponse } from '@infrastructure/http/interfaces/HttpResponse';
import { BaseController } from '@infrastructure/http/controllers/BaseController';
import { Validation } from '@infrastructure/http/interfaces/Validation';
import { ok } from '@infrastructure/http/helpers/http';

export namespace CreateWorkspaceController {
  export type Request = HttpRequest<CreateWorkspaceInterface.Request>;
  export type Response = HttpResponse<{ id: string }>;
}

export class CreateWorkspaceController extends BaseController {
  constructor(
    private readonly createWorkspaceValidation: Validation,
    private readonly createWorkspace: CreateWorkspaceInterface
  ) {
    super(createWorkspaceValidation);
  }

  async execute(
    httpRequest: CreateWorkspaceController.Request
  ): Promise<CreateWorkspaceController.Response> {
    const { name, icon, members } = httpRequest.body!;

    // TODO: create new page and provide it's  id, reference, icon and path
    const pages = [
      {
        id: Date.now().toString(),
        reference: `introduction-09871237456`,
        icon: '1F607',
        path: null,
      },
    ];

    const id = await this.createWorkspace.execute({
      name,
      icon,
      members,
      pages,
    });

    return ok({ id });
  }
}
