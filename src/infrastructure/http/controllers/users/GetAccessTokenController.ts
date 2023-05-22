import { InvalidTokenError } from '@application/errors/InvalidTokenError';
import { HttpRequest } from '@infrastructure/http/interfaces/HttpRequest';
import { HttpResponse } from '@infrastructure/http/interfaces/HttpResponse';
import { GetAccessTokenInterface } from '@application/interfaces/use-cases/users/GetAccessTokenInterface';
import { BaseController } from '@infrastructure/http/controllers/BaseController';
import { AuthTokenNotProvidedError } from '@infrastructure/http/errors/AuthTokenNotProvidedError';
import { ok, unauthorized } from '@infrastructure/http/helpers/http';

export namespace GetAccessTokenController {
  export type Request = HttpRequest;
  export type Response = HttpResponse<
    { accessToken: string } | InvalidTokenError | AuthTokenNotProvidedError
  >;
}

export class GetAccessTokenController extends BaseController {
  constructor(private readonly getAccessToken: GetAccessTokenInterface) {
    super();
  }

  async execute(
    httpRequest: GetAccessTokenController.Request
  ): Promise<GetAccessTokenController.Response> {
    const { cookie } = httpRequest.headers;

    if (!cookie) {
      return unauthorized(new AuthTokenNotProvidedError());
    }

    const tokenParts = cookie.split('=');
    const token = tokenParts[1];

    const accessToken = await this.getAccessToken.execute(token);

    if (accessToken instanceof InvalidTokenError) {
      return unauthorized(new InvalidTokenError());
    }

    return ok(accessToken);
  }
}
