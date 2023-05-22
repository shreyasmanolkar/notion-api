import { UseCase } from '@application/interfaces/use-cases/UseCase';

export namespace DeleteUserInterface {
  export type Request = string;
  export type Response = void;
}

export interface DeleteUserInterface
  extends UseCase<DeleteUserInterface.Request, DeleteUserInterface.Response> {
  execute(
    userId: DeleteUserInterface.Request
  ): Promise<DeleteUserInterface.Response>;
}
