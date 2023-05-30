import { PageNotFoundError } from '@application/errors/PageNotFoundError';
import { GetPageByIdRepository } from '@application/interfaces/repositories/pages/getPageByIdRepository';
import { RemoveFromFavoriteRepository } from '@application/interfaces/repositories/pages/removeFromFavoriteRepository';
import { RemoveFromFavoriteInterface } from '@application/interfaces/use-cases/pages/removeFromFavoriteInterface';

export class RemoveFromFavorite implements RemoveFromFavoriteInterface {
  constructor(
    private readonly getPageByIdRepository: GetPageByIdRepository,
    private readonly removeFromFavoriteRepository: RemoveFromFavoriteRepository
  ) {}

  async execute(
    params: RemoveFromFavoriteInterface.Request
  ): Promise<RemoveFromFavoriteInterface.Response> {
    const { pageId, userId } = params;

    const page = await this.getPageByIdRepository.getPageById(pageId);

    if (!page) {
      return new PageNotFoundError();
    }

    await this.removeFromFavoriteRepository.removeFromFavorite({
      pageId,
      userId,
    });
  }
}
