import { PageNotFoundError } from '@application/errors/PageNotFoundError';
import { GetPageSettingsByPageIdRepository } from '@application/interfaces/repositories/pages/getPageSettingsByPageIdRepository';
import { GetPageSettingsByPageIdInterface } from '@application/interfaces/use-cases/pages/getPageSettingsByPageIdInterface';

export class GetPageSettingsByPageId
  implements GetPageSettingsByPageIdInterface
{
  constructor(
    private readonly getPageSettingsByPageIdRepository: GetPageSettingsByPageIdRepository
  ) {}

  async execute(
    pageId: GetPageSettingsByPageIdInterface.Request
  ): Promise<GetPageSettingsByPageIdInterface.Response> {
    const pageSettings =
      await this.getPageSettingsByPageIdRepository.getPageSettingsByPageId(
        pageId
      );

    if (!pageSettings) {
      return new PageNotFoundError();
    }

    return pageSettings;
  }
}
