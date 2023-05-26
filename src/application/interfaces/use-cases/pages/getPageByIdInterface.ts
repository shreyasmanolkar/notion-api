import { PageNotFoundError } from '@application/errors/PageNotFoundError';
import { UseCase } from '@application/interfaces/use-cases/UseCase';
import { Page } from '@domain/entities/Page';

export namespace GetPageByIdInterface {
  export type Request = string;
  export type Response = Page | PageNotFoundError;
}

export interface GetPageByIdInterface
  extends UseCase<GetPageByIdInterface.Request, GetPageByIdInterface.Response> {
  execute(
    pageId: GetPageByIdInterface.Request
  ): Promise<GetPageByIdInterface.Response>;
}
