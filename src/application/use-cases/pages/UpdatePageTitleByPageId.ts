import { PageNotFoundError } from '@application/errors/PageNotFoundError';
import { GetPageByIdRepository } from '@application/interfaces/repositories/pages/getPageByIdRepository';
import { UpdatePageTitleByPageIdRepository } from '@application/interfaces/repositories/pages/updatePageTitleByPageIdRepository';
import { UpdatePageTitleByPageIdInterface } from '@application/interfaces/use-cases/pages/updatePageTitleByPageIdInterface';

export class UpdatePageTitleByPageId
  implements UpdatePageTitleByPageIdInterface
{
  constructor(
    private readonly getPageByIdRepository: GetPageByIdRepository,
    private readonly updatePageTitleByPageIdRepository: UpdatePageTitleByPageIdRepository
  ) {}

  async execute(
    params: UpdatePageTitleByPageIdInterface.Request
  ): Promise<UpdatePageTitleByPageIdInterface.Response> {
    const { pageId, title } = params;

    const page = await this.getPageByIdRepository.getPageById(pageId);

    if (!page) {
      return new PageNotFoundError();
    }

    const updated =
      await this.updatePageTitleByPageIdRepository.updatePageTitleByPageId({
        pageId,
        title,
      });

    return updated;
  }
}
