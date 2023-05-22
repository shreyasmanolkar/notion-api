import { UnauthorizedError } from '@application/errors/UnauthorizedError';
import { UseCase } from '@application/interfaces/use-cases/UseCase';

export namespace SignInInterface {
  export type Request = { email: string; password: string };
  export type Response =
    | { accessToken: string; refreshToken: string }
    | UnauthorizedError;
}

export interface SignInInterface
  extends UseCase<SignInInterface.Request, SignInInterface.Response> {
  execute(
    credentials: SignInInterface.Request
  ): Promise<SignInInterface.Response>;
}
