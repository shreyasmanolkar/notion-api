import { PageNotFoundError } from '@application/errors/PageNotFoundError';
import { AddToFavoriteRepository } from '@application/interfaces/repositories/pages/addToFavoriteRepository';
import { GetPageByIdRepository } from '@application/interfaces/repositories/pages/getPageByIdRepository';
import { AddToFavoriteInterface } from '@application/interfaces/use-cases/pages/addToFavoriteInterface';

export class AddToFavorite implements AddToFavoriteInterface {
  constructor(
    private readonly getPageByIdRepository: GetPageByIdRepository,
    private readonly addToFavoriteRepository: AddToFavoriteRepository
  ) {}

  async execute(
    params: AddToFavoriteInterface.Request
  ): Promise<AddToFavoriteInterface.Response> {
    const { pageId, userId } = params;

    const page = await this.getPageByIdRepository.getPageById(pageId);

    if (!page) {
      return new PageNotFoundError();
    }

    await this.addToFavoriteRepository.addToFavorite({
      pageId,
      userId,
    });
  }
}
