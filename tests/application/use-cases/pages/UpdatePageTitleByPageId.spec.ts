import { PageNotFoundError } from '@application/errors/PageNotFoundError';
import { UpdatePageTitleByPageId } from '@application/use-cases/pages/UpdatePageTitleByPageId';
import mockPage from '@tests/domain/mock-page';
import {
  GetPageByIdRepositoryStub,
  UpdatePageTitleByPageIdRepositoryStub,
} from '@tests/infrastructure/mocks/pages/repositories';

type SutTypes = {
  sut: UpdatePageTitleByPageId;
  getPageByIdRepositoryStub: GetPageByIdRepositoryStub;
  updatePageTitleByPageIdRepositoryStub: UpdatePageTitleByPageIdRepositoryStub;
};

const makeSut = (): SutTypes => {
  const getPageByIdRepositoryStub = new GetPageByIdRepositoryStub();
  const updatePageTitleByPageIdRepositoryStub =
    new UpdatePageTitleByPageIdRepositoryStub();
  const sut = new UpdatePageTitleByPageId(
    getPageByIdRepositoryStub,
    updatePageTitleByPageIdRepositoryStub
  );
  return {
    sut,
    getPageByIdRepositoryStub,
    updatePageTitleByPageIdRepositoryStub,
  };
};

describe('UpdatePageTitleByPageId', () => {
  it('should call UpdatePageTitleByPageIdRepository with correct post id', async () => {
    const { sut, updatePageTitleByPageIdRepositoryStub } = makeSut();
    const updatePageTitleByPageIdRepositorySpy = jest.spyOn(
      updatePageTitleByPageIdRepositoryStub,
      'updatePageTitleByPageId'
    );
    const { id, title } = mockPage();
    await sut.execute({
      pageId: id,
      title,
    });
    expect(updatePageTitleByPageIdRepositorySpy).toHaveBeenCalledWith({
      pageId: id,
      title,
    });
  });

  it('should return a PageIdNotFoundError if GetUserByIdRepository returns null', async () => {
    const { sut, getPageByIdRepositoryStub } = makeSut();
    jest
      .spyOn(getPageByIdRepositoryStub, 'getPageById')
      .mockReturnValueOnce(Promise.resolve(null));

    const { id, title } = mockPage();
    const response = await sut.execute({
      pageId: id,
      title,
    });
    expect(response).toEqual(new PageNotFoundError());
  });

  it('should return an updated page on success', async () => {
    const { sut } = makeSut();
    const page = mockPage();

    const response = await sut.execute({
      pageId: page.id,
      title: page.title,
    });

    expect(response).toEqual(page);
  });
});
