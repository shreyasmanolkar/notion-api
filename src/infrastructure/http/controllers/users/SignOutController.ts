import { HttpRequest } from '@infrastructure/http/interfaces/HttpRequest';
import { BaseController } from '@infrastructure/http/controllers/BaseController';
import { SignOutInterface } from '@application/interfaces/use-cases/users/SignOutInterface';
import { HttpResponse } from '@infrastructure/http/interfaces/HttpResponse';
import { ok } from '@infrastructure/http/helpers/http';

export namespace SignOutController {
  export type Request = HttpRequest;
  export type Response = HttpResponse<{ message: string }>;
}

export class SignOutController extends BaseController {
  constructor(private readonly signOut: SignOutInterface) {
    super();
  }

  async execute(
    httpRequest: SignOutController.Request
  ): Promise<SignOutController.Response> {
    const { cookie } = httpRequest.headers;
    const tokenParts = cookie.split('=');
    const token = tokenParts[1];

    await this.signOut.execute(token);

    const refreshCookie = {
      token: '',
    };

    return ok(
      {
        message: 'signed out successfully',
      },
      refreshCookie
    );
  }
}
