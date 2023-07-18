import { UserNotFoundError } from '@application/errors/UserNotFoundError';
import { User, UserProps } from '@domain/entities/User';
import { UseCase } from '@application/interfaces/use-cases/UseCase';

export namespace UpdateUserInterface {
  export type UserIdType = string;
  export type UserDataType = Partial<
    Omit<UserProps, 'id' | 'createdAt' | 'updatedAt' | 'profilePicture'>
  >;

  export type Request = {
    userId: UserIdType;
    userData: UserDataType;
  };
  export type Response = User | UserNotFoundError;
}

export interface UpdateUserInterface
  extends UseCase<UpdateUserInterface.Request, UpdateUserInterface.Response> {
  execute(
    params: UpdateUserInterface.Request
  ): Promise<UpdateUserInterface.Response>;
}
