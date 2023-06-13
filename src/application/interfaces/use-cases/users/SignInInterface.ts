import { InvalidPasswordError } from '@application/errors/InvalidPasswordError';
import { InvalidUserError } from '@application/errors/InvalidUserError';
import { UseCase } from '@application/interfaces/use-cases/UseCase';

export namespace SignInInterface {
  export type Request = { email: string; password: string };
  export type Response =
    | { accessToken: string; refreshToken: string }
    | InvalidUserError
    | InvalidPasswordError;
}

export interface SignInInterface
  extends UseCase<SignInInterface.Request, SignInInterface.Response> {
  execute(
    credentials: SignInInterface.Request
  ): Promise<SignInInterface.Response>;
}
