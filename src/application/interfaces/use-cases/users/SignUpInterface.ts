import { EmailInUseError } from '@application/errors/EmailInUseError';
import { UserProps } from '@domain/entities/User';
import { UseCase } from '@application/interfaces/use-cases/UseCase';

export namespace SignUpInterface {
  export type Request = Omit<UserProps, 'id' | 'createdAt' | 'updatedAt'>;
  export type Response = string | EmailInUseError;
}

export interface SignUpInterface
  extends UseCase<SignUpInterface.Request, SignUpInterface.Response> {
  execute(userData: SignUpInterface.Request): Promise<SignUpInterface.Response>;
}
