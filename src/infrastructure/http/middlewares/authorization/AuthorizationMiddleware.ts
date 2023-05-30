import { ForbiddenError } from '@application/errors/ForbiddenError';
import { PageNotFoundError } from '@application/errors/PageNotFoundError';
import { AuthorizationInterface } from '@application/interfaces/use-cases/pages/authorizationInterface';
import { PermissionError } from '@infrastructure/http/errors/PermissionError';
import { forbidden, ok } from '@infrastructure/http/helpers/http';
import { HttpRequest } from '@infrastructure/http/interfaces/HttpRequest';
import { HttpResponse } from '@infrastructure/http/interfaces/HttpResponse';
import { BaseMiddleware } from '@infrastructure/http/middlewares/BaseMiddleware';

export namespace AuthorizationMiddleware {
  export type Request = HttpRequest<undefined, { pageId: string }> & {
    userId: string;
  };
  export type Response = HttpResponse<
    { workspaceId: string } | PageNotFoundError | PermissionError
  >;
}

export class AuthorizationMiddleware extends BaseMiddleware {
  constructor(private readonly authorization: AuthorizationInterface) {
    super();
  }

  async execute(
    httpRequest: AuthorizationMiddleware.Request
  ): Promise<AuthorizationMiddleware.Response> {
    const { pageId } = httpRequest.params!;
    const userId = httpRequest.userId!;

    const workspaceIdOrError = await this.authorization.execute({
      userId,
      pageId,
    });

    if (workspaceIdOrError instanceof ForbiddenError) {
      return forbidden(new PermissionError());
    }

    if (workspaceIdOrError instanceof PageNotFoundError) {
      return forbidden(new PageNotFoundError());
    }

    return ok({ workspaceId: workspaceIdOrError });
  }
}
