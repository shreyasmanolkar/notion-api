import { UserNotFoundError } from '@application/errors/UserNotFoundError';
import { UpdateUserInterface } from '@application/interfaces/use-cases/users/UpdateUserInterface';
import { HttpRequest } from '@infrastructure/http/interfaces/HttpRequest';
import { HttpResponse } from '@infrastructure/http/interfaces/HttpResponse';
import { BaseController } from '@infrastructure/http/controllers/BaseController';
import { Validation } from '@infrastructure/http/interfaces/Validation';
import { GetUserByIdInterface } from '@application/interfaces/use-cases/users/GetUserByIdInterface';
import { notFound, ok } from '@infrastructure/http/helpers/http';

export namespace UpdateUserController {
  export type Request = HttpRequest<
    UpdateUserInterface.UserDataType,
    { userId: string }
  >;
  export type Response = HttpResponse<
    UpdateUserInterface.Response | UserNotFoundError
  >;
}

export class UpdateUserController extends BaseController {
  constructor(
    private readonly updateUserValidation: Validation,
    private readonly getUserById: GetUserByIdInterface,
    private readonly updateUser: UpdateUserInterface
  ) {
    super(updateUserValidation);
  }

  async execute(
    httpRequest: UpdateUserController.Request
  ): Promise<UpdateUserController.Response> {
    const { userId } = httpRequest.params!;
    const userData = httpRequest.body!;

    const userOrError = await this.getUserById.execute(userId);

    if (userOrError instanceof UserNotFoundError) {
      return notFound(userOrError);
    }

    const updateUserOrError = await this.updateUser.execute({
      userId,
      userData,
    });

    if (updateUserOrError instanceof UserNotFoundError) {
      return notFound(updateUserOrError);
    }

    return ok(updateUserOrError);
  }
}
