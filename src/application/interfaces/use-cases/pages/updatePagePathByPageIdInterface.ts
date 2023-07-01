import { PageNotFoundError } from '@application/errors/PageNotFoundError';
import { UseCase } from '@application/interfaces/use-cases/UseCase';
import { Page } from '@domain/entities/Page';

export namespace UpdatePagePathByPageIdInterface {
  export type Request = {
    pageId: string;
    path: string;
  };
  export type Response = Page | PageNotFoundError;
}

export interface UpdatePagePathByPageIdInterface
  extends UseCase<
    UpdatePagePathByPageIdInterface.Request,
    UpdatePagePathByPageIdInterface.Response
  > {
  execute(
    params: UpdatePagePathByPageIdInterface.Request
  ): Promise<UpdatePagePathByPageIdInterface.Response>;
}
