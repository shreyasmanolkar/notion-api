import { PageNotFoundError } from '@application/errors/PageNotFoundError';
import { GetPageByIdRepository } from '@application/interfaces/repositories/pages/getPageByIdRepository';
import { GetPageByIdInterface } from '@application/interfaces/use-cases/pages/getPageByIdInterface';

export class GetPageById implements GetPageByIdInterface {
  constructor(private readonly getPageByIdRepository: GetPageByIdRepository) {}

  async execute(
    pageId: GetPageByIdInterface.Request
  ): Promise<GetPageByIdInterface.Response> {
    const page = await this.getPageByIdRepository.getPageById(pageId);

    if (!page) {
      return new PageNotFoundError();
    }

    return page;
  }
}
