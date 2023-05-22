import { UserNotFoundError } from '@application/errors/UserNotFoundError';
import { HttpRequest } from '@infrastructure/http/interfaces/HttpRequest';
import { HttpResponse } from '@infrastructure/http/interfaces/HttpResponse';
import { BaseController } from '@infrastructure/http/controllers/BaseController';
import { GetUserByIdInterface } from '@application/interfaces/use-cases/users/GetUserByIdInterface';
import { UpdateUserProfilePictureInterface } from '@application/interfaces/use-cases/users/UpdateUserProfilePictureInterface';
import { noContent, notFound } from '@infrastructure/http/helpers/http';
import { Validation } from '@infrastructure/http/interfaces/Validation';

export namespace UpdateUserProfilePictureController {
  export type Request = HttpRequest<{ url: string }, { userId: string }>;
  export type Response = HttpResponse<undefined | UserNotFoundError>;
}

export class UpdateUserProfilePictureController extends BaseController {
  constructor(
    private readonly updateUserProfiePictureValidation: Validation,
    private readonly getUserById: GetUserByIdInterface,
    private readonly updateUserProfilePicture: UpdateUserProfilePictureInterface
  ) {
    super(updateUserProfiePictureValidation);
  }

  async execute(
    httpRequest: UpdateUserProfilePictureController.Request
  ): Promise<UpdateUserProfilePictureController.Response> {
    const { userId } = httpRequest.params!;
    const { url } = httpRequest.body!;

    const userOrError = await this.getUserById.execute(userId);

    if (userOrError instanceof UserNotFoundError) {
      return notFound(userOrError);
    }

    await this.updateUserProfilePicture.execute({
      userId,
      url,
    });

    return noContent();
  }
}
