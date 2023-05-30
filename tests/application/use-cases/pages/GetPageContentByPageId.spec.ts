import { PageNotFoundError } from '@application/errors/PageNotFoundError';
import { GetPageContentByPageId } from '@application/use-cases/pages/GetPageContentByPageId';
import mockPage from '@tests/domain/mock-page';
import { GetPageContentByPageIdRepositoryStub } from '@tests/infrastructure/mocks/pages/repositories';

type SutTypes = {
  sut: GetPageContentByPageId;
  getPageContentByPageIdRepositoryStub: GetPageContentByPageIdRepositoryStub;
};

const makeSut = (): SutTypes => {
  const getPageContentByPageIdRepositoryStub =
    new GetPageContentByPageIdRepositoryStub();
  const sut = new GetPageContentByPageId(getPageContentByPageIdRepositoryStub);
  return {
    sut,
    getPageContentByPageIdRepositoryStub,
  };
};

describe('GetPageContentByPageIdRepository', () => {
  it('should call GetPageContentByPageIdRepository with correct post id', async () => {
    const { sut, getPageContentByPageIdRepositoryStub } = makeSut();
    const getPageContentByPageIdRepositorySpy = jest.spyOn(
      getPageContentByPageIdRepositoryStub,
      'getPageContentByPageId'
    );
    const { id } = mockPage();
    await sut.execute(id);
    expect(getPageContentByPageIdRepositorySpy).toHaveBeenCalledWith(id);
  });

  it('should return a WorkspaceNotFoundError if GetPostByIdRepository returns null', async () => {
    const { sut, getPageContentByPageIdRepositoryStub } = makeSut();
    jest
      .spyOn(getPageContentByPageIdRepositoryStub, 'getPageContentByPageId')
      .mockReturnValueOnce(Promise.resolve(null));
    const { id } = mockPage();
    const response = await sut.execute(id);
    expect(response).toEqual(new PageNotFoundError());
  });

  it('should return a workspace on success', async () => {
    const { sut } = makeSut();
    const page = mockPage();
    const response = await sut.execute(page.id);
    expect(response).toEqual(page.content);
  });
});
