import { PageNotFoundError } from '@application/errors/PageNotFoundError';
import { GetPageContentByPageIdRepository } from '@application/interfaces/repositories/pages/getPageContentByPageIdRepository';
import { GetPageContentByPageIdInterface } from '@application/interfaces/use-cases/pages/getPageContentByPageIdInterface';

export class GetPageContentByPageId implements GetPageContentByPageIdInterface {
  constructor(
    private readonly getPageContentByPageIdRepository: GetPageContentByPageIdRepository
  ) {}

  async execute(
    pageId: GetPageContentByPageIdInterface.Request
  ): Promise<GetPageContentByPageIdInterface.Response> {
    const pageContent =
      await this.getPageContentByPageIdRepository.getPageContentByPageId(
        pageId
      );

    if (!pageContent) {
      return new PageNotFoundError();
    }

    return pageContent;
  }
}
