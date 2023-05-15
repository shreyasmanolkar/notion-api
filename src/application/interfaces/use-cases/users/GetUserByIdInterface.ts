import { UserNotFoundError } from '@application/errors/UserNotFoundError';
import { User } from '@domain/entities/User';
import { UseCase } from '@application/interfaces/use-cases/UseCase';

export namespace GetUserByIdInterface {
  export type Request = string;
  export type Response = User | UserNotFoundError;
}

export interface GetUserByIdInterface
  extends UseCase<GetUserByIdInterface.Request, GetUserByIdInterface.Response> {
  execute(
    userId: GetUserByIdInterface.Request
  ): Promise<GetUserByIdInterface.Response>;
}
