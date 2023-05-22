/* eslint-disable @typescript-eslint/no-unused-vars */
import { BaseController } from '@infrastructure/http/controllers/BaseController';
import { HttpRequest } from '@infrastructure/http/interfaces/HttpRequest';
import { HttpResponse } from '@infrastructure/http/interfaces/HttpResponse';
import { ok } from '@infrastructure/http/helpers/http';

export class ControllerStub extends BaseController {
  async execute(_httpRequest: HttpRequest): Promise<HttpResponse> {
    return ok('any_body');
  }
}
