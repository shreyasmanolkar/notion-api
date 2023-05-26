import { PageNotFoundError } from '@application/errors/PageNotFoundError';
import { UseCase } from '@application/interfaces/use-cases/UseCase';
import { Page } from '@domain/entities/Page';

export namespace UpdatePageIconByPageIdInterface {
  export type Request = {
    pageId: string;
    icon: string;
  };
  export type Response = Page | PageNotFoundError;
}

export interface UpdatePageIconByPageIdInterface
  extends UseCase<
    UpdatePageIconByPageIdInterface.Request,
    UpdatePageIconByPageIdInterface.Response
  > {
  execute(
    params: UpdatePageIconByPageIdInterface.Request
  ): Promise<UpdatePageIconByPageIdInterface.Response>;
}
