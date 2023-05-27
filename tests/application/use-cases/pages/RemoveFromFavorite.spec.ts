import { PageNotFoundError } from '@application/errors/PageNotFoundError';
import { RemoveFromFavorite } from '@application/use-cases/pages/RemoveFromFavorite';
import mockPage from '@tests/domain/mock-page';
import {
  GetPageByIdRepositoryStub,
  RemoveFromFavoriteRepositoryStub,
} from '@tests/infrastructure/mocks/pages/repositories';

type SutTypes = {
  sut: RemoveFromFavorite;
  getPageByIdRepositoryStub: GetPageByIdRepositoryStub;
  removeFromFavoriteRepositoryStub: RemoveFromFavoriteRepositoryStub;
};

const makesSut = (): SutTypes => {
  const getPageByIdRepositoryStub = new GetPageByIdRepositoryStub();
  const removeFromFavoriteRepositoryStub =
    new RemoveFromFavoriteRepositoryStub();
  const sut = new RemoveFromFavorite(
    getPageByIdRepositoryStub,
    removeFromFavoriteRepositoryStub
  );

  return {
    sut,
    getPageByIdRepositoryStub,
    removeFromFavoriteRepositoryStub,
  };
};

describe('RemoveFromFavorite', () => {
  it('should call RemoveFromFavoriteRepository with correct data', async () => {
    const { sut, removeFromFavoriteRepositoryStub } = makesSut();
    const removeFromFavoriteRepositorySpy = jest.spyOn(
      removeFromFavoriteRepositoryStub,
      'removeFromFavorite'
    );
    const { id } = mockPage();
    const userId = 'sample-user-id';

    await sut.execute({
      pageId: id,
      userId,
    });

    expect(removeFromFavoriteRepositorySpy).toHaveBeenCalledWith({
      pageId: id,
      userId,
    });
  });

  it('should return a PageNotFoundError if workspace is not present', async () => {
    const { sut, getPageByIdRepositoryStub } = makesSut();
    jest
      .spyOn(getPageByIdRepositoryStub, 'getPageById')
      .mockReturnValueOnce(Promise.resolve(null));

    const { id } = mockPage();
    const userId = 'sample-member-id';

    const response = await sut.execute({ pageId: id, userId });
    expect(response).toEqual(new PageNotFoundError());
  });
});
