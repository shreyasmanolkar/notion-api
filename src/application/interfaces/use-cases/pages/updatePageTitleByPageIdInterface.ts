import { PageNotFoundError } from '@application/errors/PageNotFoundError';
import { UseCase } from '@application/interfaces/use-cases/UseCase';
import { Page } from '@domain/entities/Page';

export namespace UpdatePageTitleByPageIdInterface {
  export type Request = {
    pageId: string;
    title: string;
  };
  export type Response = Page | PageNotFoundError;
}

export interface UpdatePageTitleByPageIdInterface
  extends UseCase<
    UpdatePageTitleByPageIdInterface.Request,
    UpdatePageTitleByPageIdInterface.Response
  > {
  execute(
    params: UpdatePageTitleByPageIdInterface.Request
  ): Promise<UpdatePageTitleByPageIdInterface.Response>;
}
