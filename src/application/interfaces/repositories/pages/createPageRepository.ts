import { PageProps } from '@domain/entities/Page';

export namespace CreatePageRepository {
  export type Request = Omit<
    PageProps,
    'id' | 'createdAt' | 'updatedAt' | 'reference'
  >;
  export type Response = string;
}

export interface CreatePageRepository {
  createPage(
    pageData: CreatePageRepository.Request
  ): Promise<CreatePageRepository.Response>;
}
