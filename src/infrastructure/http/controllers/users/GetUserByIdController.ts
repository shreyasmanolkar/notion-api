import { GetUserByIdInterface } from '@application/interfaces/use-cases/users/GetUserByIdInterface';
import { HttpRequest } from '@infrastructure/http/interfaces/HttpRequest';
import { HttpResponse } from '@infrastructure/http/interfaces/HttpResponse';
import { BaseController } from '@infrastructure/http/controllers/BaseController';
import { ok } from '@infrastructure/http/helpers/http';

export namespace GetUserByIdController {
  export type Request = HttpRequest<undefined, { userId: string }>;
  export type Response = HttpResponse<GetUserByIdInterface.Response>;
}

export class GetUserByIdController extends BaseController {
  constructor(private readonly getUserById: GetUserByIdInterface) {
    super();
  }

  async execute(
    httpRequest: GetUserByIdController.Request
  ): Promise<GetUserByIdController.Response> {
    const { userId } = httpRequest.params!;
    const response = await this.getUserById.execute(userId);
    return ok(response);
  }
}
