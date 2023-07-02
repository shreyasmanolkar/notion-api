import { PageNotFoundError } from '@application/errors/PageNotFoundError';
import { UseCase } from '@application/interfaces/use-cases/UseCase';
import { Page } from '@domain/entities/Page';

export namespace UpdatePageCoverByPageIdInterface {
  export type Request = {
    pageId: string;
    url: string;
    verticalPosition: number;
  };
  export type Response = Page | PageNotFoundError;
}

export interface UpdatePageCoverByPageIdInterface
  extends UseCase<
    UpdatePageCoverByPageIdInterface.Request,
    UpdatePageCoverByPageIdInterface.Response
  > {
  execute(
    params: UpdatePageCoverByPageIdInterface.Request
  ): Promise<UpdatePageCoverByPageIdInterface.Response>;
}
