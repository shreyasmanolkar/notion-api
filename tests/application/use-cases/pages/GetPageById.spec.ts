import { PageNotFoundError } from '@application/errors/PageNotFoundError';
import { GetPageById } from '@application/use-cases/pages/GetPageById';
import mockPage from '@tests/domain/mock-page';
import { GetPageByIdRepositoryStub } from '@tests/infrastructure/mocks/pages/repositories';

type SutTypes = {
  sut: GetPageById;
  getPageByIdRepositoryStub: GetPageByIdRepositoryStub;
};

const makeSut = (): SutTypes => {
  const getPageByIdRepositoryStub = new GetPageByIdRepositoryStub();
  const sut = new GetPageById(getPageByIdRepositoryStub);
  return {
    sut,
    getPageByIdRepositoryStub,
  };
};

describe('GetPageByIdRepository', () => {
  it('should call GetPageByIdRepository with correct post id', async () => {
    const { sut, getPageByIdRepositoryStub } = makeSut();
    const getPageByIdRepositorySpy = jest.spyOn(
      getPageByIdRepositoryStub,
      'getPageById'
    );
    const { id } = mockPage();
    await sut.execute(id);
    expect(getPageByIdRepositorySpy).toHaveBeenCalledWith(id);
  });

  it('should return a WorkspaceNotFoundError if GetPostByIdRepository returns null', async () => {
    const { sut, getPageByIdRepositoryStub } = makeSut();
    jest
      .spyOn(getPageByIdRepositoryStub, 'getPageById')
      .mockReturnValueOnce(Promise.resolve(null));
    const { id } = mockPage();
    const response = await sut.execute(id);
    expect(response).toEqual(new PageNotFoundError());
  });

  it('should return a workspace on success', async () => {
    const { sut } = makeSut();
    const page = mockPage();
    const response = await sut.execute(page.id);
    expect(response).toEqual(page);
  });
});
