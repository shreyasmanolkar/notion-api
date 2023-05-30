import { ForbiddenError } from '@application/errors/ForbiddenError';
import { PageNotFoundError } from '@application/errors/PageNotFoundError';
import { UseCase } from '@application/interfaces/use-cases/UseCase';

export namespace AuthorizationInterface {
  export type Request = {
    userId: string;
    pageId: string;
  };
  export type Response = string | PageNotFoundError | ForbiddenError;
}

export interface AuthorizationInterface
  extends UseCase<
    AuthorizationInterface.Request,
    AuthorizationInterface.Response
  > {
  execute(
    params: AuthorizationInterface.Request
  ): Promise<AuthorizationInterface.Response>;
}
