import { PageNotFoundError } from '@application/errors/PageNotFoundError';
import { AddToFavorite } from '@application/use-cases/pages/AddToFavorite';
import mockPage from '@tests/domain/mock-page';
import {
  AddToFavoriteRepositoryStub,
  GetPageByIdRepositoryStub,
} from '@tests/infrastructure/mocks/pages/repositories';

type SutTypes = {
  sut: AddToFavorite;
  getPageByIdRepositoryStub: GetPageByIdRepositoryStub;
  addToFavoriteRepositoryStub: AddToFavoriteRepositoryStub;
};

const makesSut = (): SutTypes => {
  const getPageByIdRepositoryStub = new GetPageByIdRepositoryStub();
  const addToFavoriteRepositoryStub = new AddToFavoriteRepositoryStub();
  const sut = new AddToFavorite(
    getPageByIdRepositoryStub,
    addToFavoriteRepositoryStub
  );

  return {
    sut,
    getPageByIdRepositoryStub,
    addToFavoriteRepositoryStub,
  };
};

describe('AddToFavoriteRepository', () => {
  it('should call AddToFavoriteRepository with correct data', async () => {
    const { sut, addToFavoriteRepositoryStub } = makesSut();
    const addToFavoriteRepositorySpy = jest.spyOn(
      addToFavoriteRepositoryStub,
      'addToFavorite'
    );
    const { id } = mockPage();
    const userId = 'sample-user-id-2';
    await sut.execute({
      pageId: id,
      userId,
    });

    expect(addToFavoriteRepositorySpy).toHaveBeenCalledWith({
      pageId: id,
      userId,
    });
  });

  it('should return workspace not found error if page is not present', async () => {
    const { sut, getPageByIdRepositoryStub } = makesSut();

    jest
      .spyOn(getPageByIdRepositoryStub, 'getPageById')
      .mockReturnValueOnce(Promise.resolve(null));

    const response = await sut.execute({
      pageId: 'sample-null-page-id',
      userId: 'sample-user-id-2',
    });

    expect(response).toEqual(new PageNotFoundError());
  });
});
