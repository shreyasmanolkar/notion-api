import { GetPageIdsByPath } from '@application/use-cases/pages/GetPageIdsByPath';
import mockPage from '@tests/domain/mock-page';
import { GetPageIdsByPathRepositoryStub } from '@tests/infrastructure/mocks/pages/repositories';

type SutTypes = {
  sut: GetPageIdsByPath;
  getPageIdsByPathRepositoryStub: GetPageIdsByPathRepositoryStub;
};

const makeSut = (): SutTypes => {
  const getPageIdsByPathRepositoryStub = new GetPageIdsByPathRepositoryStub();
  const sut = new GetPageIdsByPath(getPageIdsByPathRepositoryStub);
  return {
    sut,
    getPageIdsByPathRepositoryStub,
  };
};

describe('GetPageIdsByPath', () => {
  it('should call getPageIdsByPathRepository with correct path', async () => {
    const { sut, getPageIdsByPathRepositoryStub } = makeSut();
    const getPageIdsByPathRepositorySpy = jest.spyOn(
      getPageIdsByPathRepositoryStub,
      'getPageIdsByPath'
    );
    const { path } = mockPage();
    await sut.execute(path!);
    expect(getPageIdsByPathRepositorySpy).toHaveBeenCalledWith(path);
  });

  it('should return a pageIds array on success', async () => {
    const { sut } = makeSut();
    const { id, path } = mockPage();
    const response = await sut.execute(path!);
    expect(response).toEqual([id]);
  });
});
