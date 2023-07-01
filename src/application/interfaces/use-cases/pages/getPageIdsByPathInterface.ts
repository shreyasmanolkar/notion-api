import { UseCase } from '@application/interfaces/use-cases/UseCase';

export namespace GetPageIdsByPathInterface {
  export type Request = string;
  export type Response = string[] | [];
}

export interface GetPageIdsByPathInterface
  extends UseCase<
    GetPageIdsByPathInterface.Request,
    GetPageIdsByPathInterface.Response
  > {
  execute(
    path: GetPageIdsByPathInterface.Request
  ): Promise<GetPageIdsByPathInterface.Response>;
}
