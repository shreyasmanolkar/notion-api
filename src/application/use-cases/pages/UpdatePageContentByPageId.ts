import { PageNotFoundError } from '@application/errors/PageNotFoundError';
import { GetPageByIdRepository } from '@application/interfaces/repositories/pages/getPageByIdRepository';
import { UpdatePageContentByPageIdRepository } from '@application/interfaces/repositories/pages/updatePageContentByPageIdRepository';
import { UpdatePageContentByPageIdInterface } from '@application/interfaces/use-cases/pages/updatePageContentByPageIdInterface';

export class UpdatePageContentByPageId
  implements UpdatePageContentByPageIdInterface
{
  constructor(
    private readonly getPageByIdRepository: GetPageByIdRepository,
    private readonly updatePageContentByPageIdRepository: UpdatePageContentByPageIdRepository
  ) {}

  async execute(
    params: UpdatePageContentByPageIdInterface.Request
  ): Promise<UpdatePageContentByPageIdInterface.Response> {
    const { pageId, content } = params;

    const page = await this.getPageByIdRepository.getPageById(pageId);

    if (!page) {
      return new PageNotFoundError();
    }

    const updated =
      await this.updatePageContentByPageIdRepository.updatePageContentByPageId({
        pageId,
        content,
      });

    return updated;
  }
}
