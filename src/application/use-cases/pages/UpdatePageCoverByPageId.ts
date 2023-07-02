import { PageNotFoundError } from '@application/errors/PageNotFoundError';
import { GetPageByIdRepository } from '@application/interfaces/repositories/pages/getPageByIdRepository';
import { UpdatePageCoverByPageIdRepository } from '@application/interfaces/repositories/pages/updatePageCoverByPageIdRepository';
import { UpdatePageCoverByPageIdInterface } from '@application/interfaces/use-cases/pages/updatePageCoverByPageIdInterface';

export class UpdatePageCoverByPageId
  implements UpdatePageCoverByPageIdInterface
{
  constructor(
    private readonly getPageByIdRepository: GetPageByIdRepository,
    private readonly updatePageCoverByPageIdRepository: UpdatePageCoverByPageIdRepository
  ) {}

  async execute(
    params: UpdatePageCoverByPageIdInterface.Request
  ): Promise<UpdatePageCoverByPageIdInterface.Response> {
    const { pageId, url, verticalPosition } = params;

    const page = await this.getPageByIdRepository.getPageById(pageId);

    if (!page) {
      return new PageNotFoundError();
    }

    const updated =
      await this.updatePageCoverByPageIdRepository.updatePageCoverByPageId({
        pageId,
        url,
        verticalPosition,
      });

    return updated;
  }
}
