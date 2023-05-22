import { UseCase } from '@application/interfaces/use-cases/UseCase';

export namespace SignOutInterface {
  export type Request = string;
  export type Response = void;
}

export interface SignOutInterface
  extends UseCase<SignOutInterface.Request, SignOutInterface.Response> {
  execute(token: SignOutInterface.Request): Promise<SignOutInterface.Response>;
}
