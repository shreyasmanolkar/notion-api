import { EmailInUseError } from '@application/errors/EmailInUseError';
import { SignUpInterface } from '@application/interfaces/use-cases/users/SignUpInterface';
import { HttpRequest } from '@infrastructure/http/interfaces/HttpRequest';
import { HttpResponse } from '@infrastructure/http/interfaces/HttpResponse';
import { BaseController } from '@infrastructure/http/controllers/BaseController';
import { Validation } from '@infrastructure/http/interfaces/Validation';
import { SignInInterface } from '@application/interfaces/use-cases/users/SignInInterface';
import { forbidden, ok, unauthorized } from '@infrastructure/http/helpers/http';

export namespace SignUpController {
  export type Request = HttpRequest<SignUpInterface.Request>;
  export type Response = HttpResponse<
    { authenticationToken: string } | EmailInUseError
  >;
}

export class SignUpController extends BaseController {
  constructor(
    private readonly signUpValidation: Validation,
    private readonly signUp: SignUpInterface,
    private readonly signIn: SignInInterface
  ) {
    super(signUpValidation);
  }

  async execute(
    httpRequest: SignUpController.Request
  ): Promise<SignUpController.Response> {
    const { name, email, password, isDarkMode, profilePicture } =
      httpRequest.body!;

    // TODO: create new workspace and provide it's id in workspaces in this format { workspaceId: <workspaceId>, favorites: [] }
    const workspaces = [
      {
        workspaceId: Date.now().toString(),
        favorites: [],
      },
    ];

    const idOrError = await this.signUp.execute({
      name,
      email,
      password,
      isDarkMode,
      profilePicture,
      workspaces,
    });

    if (idOrError instanceof EmailInUseError) {
      return forbidden(idOrError);
    }

    const authenticationTokenOrError = await this.signIn.execute({
      email,
      password,
    });

    if (authenticationTokenOrError instanceof Error) {
      return unauthorized(authenticationTokenOrError);
    }

    return ok({
      authenticationToken: authenticationTokenOrError,
    });
  }
}
