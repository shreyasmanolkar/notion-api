import { UserNotFoundError } from '@application/errors/UserNotFoundError';
import { AddWorkspaceByUserIdInterface } from '@application/interfaces/use-cases/users/AddWorkspaceByUserIdInterface';
import { HttpRequest } from '@infrastructure/http/interfaces/HttpRequest';
import { HttpResponse } from '@infrastructure/http/interfaces/HttpResponse';
import { BaseController } from '@infrastructure/http/controllers/BaseController';
import { Validation } from '@infrastructure/http/interfaces/Validation';
import { GetUserByIdInterface } from '@application/interfaces/use-cases/users/GetUserByIdInterface';
import { notFound, ok } from '@infrastructure/http/helpers/http';

export namespace AddWorkspaceByUserIdController {
  export type Request = HttpRequest<undefined, { workspaceId: string }>;
  export type Response = HttpResponse<
    AddWorkspaceByUserIdInterface.Response | UserNotFoundError
  >;
}

export class AddWorkspaceByUserIdController extends BaseController {
  constructor(
    private readonly addWorkspaceByUserIdValidation: Validation,
    private readonly getUserById: GetUserByIdInterface,
    private readonly addWorkspaceById: AddWorkspaceByUserIdInterface
  ) {
    super(addWorkspaceByUserIdValidation);
  }

  async execute(
    httpRequest: AddWorkspaceByUserIdController.Request
  ): Promise<AddWorkspaceByUserIdController.Response> {
    const userId = httpRequest.userId!;
    const { workspaceId } = httpRequest.params!;

    const userOrError = await this.getUserById.execute(userId);

    if (userOrError instanceof UserNotFoundError) {
      return notFound(userOrError);
    }

    const addWorkspaceById = await this.addWorkspaceById.execute({
      userId,
      workspaceId,
    });

    return ok(addWorkspaceById);
  }
}
