import { UseCase } from '@application/interfaces/use-cases/UseCase';
import { PageProps } from '@domain/entities/Page';

export namespace CreatePageInterface {
  export type Request = Omit<
    PageProps,
    'id' | 'createdAt' | 'updatedAt' | 'reference'
  >;
  export type Response = string;
}

export interface CreatePageInterface
  extends UseCase<CreatePageInterface.Request, CreatePageInterface.Response> {
  execute(
    pageData: CreatePageInterface.Request
  ): Promise<CreatePageInterface.Response>;
}
