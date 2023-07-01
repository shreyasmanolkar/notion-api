import { PageNotFoundError } from '@application/errors/PageNotFoundError';
import { GetPageByIdRepository } from '@application/interfaces/repositories/pages/getPageByIdRepository';
import { UpdatePagePathByPageIdRepository } from '@application/interfaces/repositories/pages/updatePagePathByPageIdRepository';
import { UpdatePagePathByPageIdInterface } from '@application/interfaces/use-cases/pages/updatePagePathByPageIdInterface';

export class UpdatePagePathByPageId implements UpdatePagePathByPageIdInterface {
  constructor(
    private readonly getPageByIdRepository: GetPageByIdRepository,
    private readonly updatePagePathByPageIdRepository: UpdatePagePathByPageIdRepository
  ) {}

  async execute(
    params: UpdatePagePathByPageIdInterface.Request
  ): Promise<UpdatePagePathByPageIdInterface.Response> {
    const { pageId, path } = params;

    const page = await this.getPageByIdRepository.getPageById(pageId);

    if (!page) {
      return new PageNotFoundError();
    }

    const updated =
      await this.updatePagePathByPageIdRepository.updatePagePathByPageId({
        pageId,
        path,
      });

    return updated;
  }
}
