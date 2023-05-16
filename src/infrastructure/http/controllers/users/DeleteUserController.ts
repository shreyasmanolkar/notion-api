import { UserNotFoundError } from '@application/errors/UserNotFoundError';
import { PermissionError } from '@infrastructure/http/errors/PermissionError';
import { HttpRequest } from '@infrastructure/http/interfaces/HttpRequest';
import { HttpResponse } from '@infrastructure/http/interfaces/HttpResponse';
import { BaseController } from '@infrastructure/http/controllers/BaseController';
import { DeleteUserInterface } from '@application/interfaces/use-cases/users/DeleteUserInterface';
import { noContent } from '@infrastructure/http/helpers/http';

export namespace DeleteUserController {
  export type Request = HttpRequest;
  export type Response = HttpResponse<
    undefined | UserNotFoundError | PermissionError
  >;
}

export class DeleteUserController extends BaseController {
  constructor(private readonly deleteUser: DeleteUserInterface) {
    super();
  }

  async execute(
    httpRequest: DeleteUserController.Request
  ): Promise<DeleteUserController.Response> {
    const userId = httpRequest.userId!;

    // TODO: delete workspaces corresponding to userId if workspace is not shared else delete user

    await this.deleteUser.execute(userId);
    return noContent();
  }
}
