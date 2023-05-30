import { PageNotFoundError } from '@application/errors/PageNotFoundError';
import { UseCase } from '@application/interfaces/use-cases/UseCase';
import { ContentType } from '@domain/entities/Page';

export namespace GetPageContentByPageIdInterface {
  export type Request = string;
  export type Response = ContentType | PageNotFoundError;
}

export interface GetPageContentByPageIdInterface
  extends UseCase<
    GetPageContentByPageIdInterface.Request,
    GetPageContentByPageIdInterface.Response
  > {
  execute(
    pageId: GetPageContentByPageIdInterface.Request
  ): Promise<GetPageContentByPageIdInterface.Response>;
}
