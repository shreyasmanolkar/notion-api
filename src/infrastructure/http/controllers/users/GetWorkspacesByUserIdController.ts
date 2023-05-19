import { GetWorkspacesByUserIdInterface } from '@application/interfaces/use-cases/users/GetWorkspacesByUserIdInterface';
import { HttpRequest } from '@infrastructure/http/interfaces/HttpRequest';
import { HttpResponse } from '@infrastructure/http/interfaces/HttpResponse';
import { BaseController } from '@infrastructure/http/controllers/BaseController';
import { ok } from '@infrastructure/http/helpers/http';

export namespace GetWorkspacesByUserIdController {
  export type Request = HttpRequest<undefined, { userId: string }>;
  export type Response = HttpResponse<GetWorkspacesByUserIdInterface.Response>;
}

export class GetWorkspacesByUserIdController extends BaseController {
  constructor(
    private readonly getWorkspacesByUserId: GetWorkspacesByUserIdInterface
  ) {
    super();
  }

  async execute(
    httpRequest: GetWorkspacesByUserIdController.Request
  ): Promise<GetWorkspacesByUserIdController.Response> {
    const { userId } = await httpRequest.params!;
    const response = await this.getWorkspacesByUserId.execute(userId);
    return ok(response);
  }
}
