import { PageNotFoundError } from '@application/errors/PageNotFoundError';
import { GetPageByIdRepository } from '@application/interfaces/repositories/pages/getPageByIdRepository';
import { UpdatePageSettingsByPageIdRepository } from '@application/interfaces/repositories/pages/updatePageSettingsByPageIdRepository';
import { UpdatePageSettingsByPageIdInterface } from '@application/interfaces/use-cases/pages/updatePageSettingsByPageIdInterface';

export class UpdatePageSettingsByPageId
  implements UpdatePageSettingsByPageIdInterface
{
  constructor(
    private readonly getPageByIdRepository: GetPageByIdRepository,
    private readonly updatePageSettingsByPageIdRepository: UpdatePageSettingsByPageIdRepository
  ) {}

  async execute(
    params: UpdatePageSettingsByPageIdInterface.Request
  ): Promise<UpdatePageSettingsByPageIdInterface.Response> {
    const { pageId, settings } = params;

    const page = await this.getPageByIdRepository.getPageById(pageId);

    if (!page) {
      return new PageNotFoundError();
    }

    const updated =
      await this.updatePageSettingsByPageIdRepository.updatePageSettingsByPageId(
        {
          pageId,
          pageSettings: settings,
        }
      );

    return updated;
  }
}
