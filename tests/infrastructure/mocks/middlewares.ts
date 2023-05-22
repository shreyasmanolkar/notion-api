import { ok } from '@infrastructure/http/helpers/http';
import { HttpRequest } from '@infrastructure/http/interfaces/HttpRequest';
import { HttpResponse } from '@infrastructure/http/interfaces/HttpResponse';
import { BaseMiddleware } from '@infrastructure/http/middlewares/BaseMiddleware';

export class MiddlewareStub extends BaseMiddleware {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async execute(_httpRequest: HttpRequest): Promise<HttpResponse> {
    return ok('any_body');
  }
}
