import { PageNotFoundError } from '@application/errors/PageNotFoundError';
import { UseCase } from '@application/interfaces/use-cases/UseCase';
import { ContentType, Page } from '@domain/entities/Page';

export namespace UpdatePageContentByPageIdInterface {
  export type pageIdType = string;
  export type contentType = ContentType;

  export type Request = {
    pageId: pageIdType;
    content: contentType;
  };
  export type Response = Page | PageNotFoundError;
}

export interface UpdatePageContentByPageIdInterface
  extends UseCase<
    UpdatePageContentByPageIdInterface.Request,
    UpdatePageContentByPageIdInterface.Response
  > {
  execute(
    params: UpdatePageContentByPageIdInterface.Request
  ): Promise<UpdatePageContentByPageIdInterface.Response>;
}
