import { UseCase } from '@application/interfaces/use-cases/UseCase';

export namespace DeletePageInterface {
  export type Request = string;
  export type Response = void;
}

export interface DeletePageInterface
  extends UseCase<DeletePageInterface.Request, DeletePageInterface.Response> {
  execute(
    pageId: DeletePageInterface.Request
  ): Promise<DeletePageInterface.Response>;
}
