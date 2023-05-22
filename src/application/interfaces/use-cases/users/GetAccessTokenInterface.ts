import { ForbiddenError } from '@application/errors/ForbiddenError';
import { InvalidTokenError } from '@application/errors/InvalidTokenError';
import { UseCase } from '@application/interfaces/use-cases/UseCase';

export namespace GetAccessTokenInterface {
  export type Request = string;
  export type Response =
    | { accessToken: string }
    | InvalidTokenError
    | ForbiddenError;
}

export interface GetAccessTokenInterface
  extends UseCase<
    GetAccessTokenInterface.Request,
    GetAccessTokenInterface.Response
  > {
  execute(
    token: GetAccessTokenInterface.Request
  ): Promise<GetAccessTokenInterface.Response>;
}
