import { PageNotFoundError } from '@application/errors/PageNotFoundError';
import { UpdatePageContentByPageId } from '@application/use-cases/pages/UpdatePageContentByPageId';
import mockPage from '@tests/domain/mock-page';
import {
  GetPageByIdRepositoryStub,
  UpdatePageContentByPageIdRepositoryStub,
} from '@tests/infrastructure/mocks/pages/repositories';

type SutTypes = {
  sut: UpdatePageContentByPageId;
  getPageByIdRepositoryStub: GetPageByIdRepositoryStub;
  updatePageContentByPageIdRepositoryStub: UpdatePageContentByPageIdRepositoryStub;
};

const makeSut = (): SutTypes => {
  const getPageByIdRepositoryStub = new GetPageByIdRepositoryStub();
  const updatePageContentByPageIdRepositoryStub =
    new UpdatePageContentByPageIdRepositoryStub();
  const sut = new UpdatePageContentByPageId(
    getPageByIdRepositoryStub,
    updatePageContentByPageIdRepositoryStub
  );
  return {
    sut,
    getPageByIdRepositoryStub,
    updatePageContentByPageIdRepositoryStub,
  };
};

describe('UpdatePageContentByPageId', () => {
  it('should call UpdatePageContentByPageIdRepository with correct post id', async () => {
    const { sut, updatePageContentByPageIdRepositoryStub } = makeSut();
    const updatePageContentByPageIdRepositorySpy = jest.spyOn(
      updatePageContentByPageIdRepositoryStub,
      'updatePageContentByPageId'
    );
    const { id, content } = mockPage();
    await sut.execute({
      pageId: id,
      content: { ...content },
    });
    expect(updatePageContentByPageIdRepositorySpy).toHaveBeenCalledWith({
      pageId: id,
      content,
    });
  });

  it('should return a PageIdNotFoundError if GetUserByIdRepository returns null', async () => {
    const { sut, getPageByIdRepositoryStub } = makeSut();
    jest
      .spyOn(getPageByIdRepositoryStub, 'getPageById')
      .mockReturnValueOnce(Promise.resolve(null));

    const { id, content } = mockPage();
    const response = await sut.execute({
      pageId: id,
      content,
    });
    expect(response).toEqual(new PageNotFoundError());
  });

  it('should return an updated page on success', async () => {
    const { sut } = makeSut();
    const page = mockPage();

    const response = await sut.execute({
      pageId: page.id,
      content: page.content,
    });

    expect(response).toEqual(page);
  });
});
