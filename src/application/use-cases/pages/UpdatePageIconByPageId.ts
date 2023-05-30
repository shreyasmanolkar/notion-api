import { PageNotFoundError } from '@application/errors/PageNotFoundError';
import { GetPageByIdRepository } from '@application/interfaces/repositories/pages/getPageByIdRepository';
import { UpdatePageIconByPageIdRepository } from '@application/interfaces/repositories/pages/updatePageIconByPageIdRepository';
import { UpdatePageIconByPageIdInterface } from '@application/interfaces/use-cases/pages/updatePageIconByPageIdInterface';

export class UpdatePageIconByPageId implements UpdatePageIconByPageIdInterface {
  constructor(
    private readonly getPageByIdRepository: GetPageByIdRepository,
    private readonly updatePageIconByPageIdRepository: UpdatePageIconByPageIdRepository
  ) {}

  async execute(
    params: UpdatePageIconByPageIdInterface.Request
  ): Promise<UpdatePageIconByPageIdInterface.Response> {
    const { pageId, icon } = params;

    const page = await this.getPageByIdRepository.getPageById(pageId);

    if (!page) {
      return new PageNotFoundError();
    }

    const updated =
      await this.updatePageIconByPageIdRepository.updatePageIconByPageId({
        pageId,
        icon,
      });

    return updated;
  }
}
