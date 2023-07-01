import { PageNotFoundError } from '@application/errors/PageNotFoundError';
import { UpdatePagePathByPageId } from '@application/use-cases/pages/UpdatePagePathByPageId';
import mockPage from '@tests/domain/mock-page';
import {
  GetPageByIdRepositoryStub,
  UpdatePagePathByPageIdRepositoryStub,
} from '@tests/infrastructure/mocks/pages/repositories';

type SutTypes = {
  sut: UpdatePagePathByPageId;
  getPageByIdRepositoryStub: GetPageByIdRepositoryStub;
  updatePagePathByPageIdRepositoryStub: UpdatePagePathByPageIdRepositoryStub;
};

const makeSut = (): SutTypes => {
  const getPageByIdRepositoryStub = new GetPageByIdRepositoryStub();
  const updatePagePathByPageIdRepositoryStub =
    new UpdatePagePathByPageIdRepositoryStub();
  const sut = new UpdatePagePathByPageId(
    getPageByIdRepositoryStub,
    updatePagePathByPageIdRepositoryStub
  );
  return {
    sut,
    getPageByIdRepositoryStub,
    updatePagePathByPageIdRepositoryStub,
  };
};

describe('UpdatePageTitleByPageId', () => {
  it('should call UpdatePageTitleByPageIdRepository with correct post id', async () => {
    const { sut, updatePagePathByPageIdRepositoryStub } = makeSut();
    const updatePagePathByPageIdRepositorySpy = jest.spyOn(
      updatePagePathByPageIdRepositoryStub,
      'updatePagePathByPageId'
    );
    const { id, path } = mockPage();
    await sut.execute({
      pageId: id,
      path: path!,
    });
    expect(updatePagePathByPageIdRepositorySpy).toHaveBeenCalledWith({
      pageId: id,
      path,
    });
  });

  it('should return a PageIdNotFoundError if GetUserByIdRepository returns null', async () => {
    const { sut, getPageByIdRepositoryStub } = makeSut();
    jest
      .spyOn(getPageByIdRepositoryStub, 'getPageById')
      .mockReturnValueOnce(Promise.resolve(null));

    const { id, path } = mockPage();
    const response = await sut.execute({
      pageId: id,
      path: path!,
    });
    expect(response).toEqual(new PageNotFoundError());
  });

  it('should return an updated page on success', async () => {
    const { sut } = makeSut();
    const page = mockPage();

    const response = await sut.execute({
      pageId: page.id,
      path: page.title,
    });

    expect(response).toEqual(page);
  });
});
