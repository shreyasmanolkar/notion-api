import { UnauthorizedError } from '@application/errors/UnauthorizedError';
import { SignInInterface } from '@application/interfaces/use-cases/users/SignInInterface';
import { HttpRequest } from '@infrastructure/http/interfaces/HttpRequest';
import { HttpResponse } from '@infrastructure/http/interfaces/HttpResponse';
import { BaseController } from '@infrastructure/http/controllers/BaseController';
import { Validation } from '@infrastructure/http/interfaces/Validation';
import { ok, unauthorized } from '@infrastructure/http/helpers/http';

export namespace SignInController {
  export type Request = HttpRequest<SignInInterface.Request>;
  export type Response = HttpResponse<
    { accessToken: string } | UnauthorizedError
  >;
}

export class SignInController extends BaseController {
  constructor(
    private readonly signInValidation: Validation,
    private readonly signIn: SignInInterface
  ) {
    super(signInValidation);
  }

  async execute(
    httpRequest: SignInController.Request
  ): Promise<SignInController.Response> {
    const { email, password } = httpRequest.body!;
    const authenticationTokensOrError = await this.signIn.execute({
      email,
      password,
    });

    if (authenticationTokensOrError instanceof UnauthorizedError) {
      return unauthorized(authenticationTokensOrError);
    }

    const { accessToken, refreshToken } = authenticationTokensOrError;

    const refreshCookie = {
      token: refreshToken,
    };

    return ok(
      {
        accessToken,
      },
      refreshCookie
    );
  }
}
