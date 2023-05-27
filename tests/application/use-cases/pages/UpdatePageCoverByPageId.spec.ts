import { PageNotFoundError } from '@application/errors/PageNotFoundError';
import { UpdatePageCoverByPageId } from '@application/use-cases/pages/UpdatePageCoverByPageId';
import mockPage from '@tests/domain/mock-page';
import {
  GetPageByIdRepositoryStub,
  UpdatePageCoverByPageIdRepositoryStub,
} from '@tests/infrastructure/mocks/pages/repositories';

type SutTypes = {
  sut: UpdatePageCoverByPageId;
  getPageByIdRepositoryStub: GetPageByIdRepositoryStub;
  updatePageCoverByPageIdRepositoryStub: UpdatePageCoverByPageIdRepositoryStub;
};

const makeSut = (): SutTypes => {
  const getPageByIdRepositoryStub = new GetPageByIdRepositoryStub();
  const updatePageCoverByPageIdRepositoryStub =
    new UpdatePageCoverByPageIdRepositoryStub();
  const sut = new UpdatePageCoverByPageId(
    getPageByIdRepositoryStub,
    updatePageCoverByPageIdRepositoryStub
  );
  return {
    sut,
    getPageByIdRepositoryStub,
    updatePageCoverByPageIdRepositoryStub,
  };
};

describe('UpdatePageCoverByPageId', () => {
  it('should call UpdatePageContentByPageIdRepository with correct post id', async () => {
    const { sut, updatePageCoverByPageIdRepositoryStub } = makeSut();
    const updatePageCoverByPageIdRepositorySpy = jest.spyOn(
      updatePageCoverByPageIdRepositoryStub,
      'updatePageCoverByPageId'
    );
    const { id, coverPicture } = mockPage();
    await sut.execute({
      pageId: id,
      url: coverPicture.url,
    });
    expect(updatePageCoverByPageIdRepositorySpy).toHaveBeenCalledWith({
      pageId: id,
      url: coverPicture.url,
    });
  });

  it('should return a PageIdNotFoundError if GetUserByIdRepository returns null', async () => {
    const { sut, getPageByIdRepositoryStub } = makeSut();
    jest
      .spyOn(getPageByIdRepositoryStub, 'getPageById')
      .mockReturnValueOnce(Promise.resolve(null));

    const { id, coverPicture } = mockPage();
    const response = await sut.execute({
      pageId: id,
      url: coverPicture.url,
    });
    expect(response).toEqual(new PageNotFoundError());
  });

  it('should return an updated page on success', async () => {
    const { sut } = makeSut();
    const page = mockPage();

    const response = await sut.execute({
      pageId: page.id,
      url: page.coverPicture.url,
    });

    expect(response).toEqual(page);
  });
});
