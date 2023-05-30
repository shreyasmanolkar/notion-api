import { PageNotFoundError } from '@application/errors/PageNotFoundError';
import { GetPageSettingsByPageId } from '@application/use-cases/pages/GetPageSettingsByPageId';
import mockPage from '@tests/domain/mock-page';
import { GetPageSettingsByPageIdRepositoryStub } from '@tests/infrastructure/mocks/pages/repositories';

type SutTypes = {
  sut: GetPageSettingsByPageId;
  getPageSettingsByPageIdRepositoryStub: GetPageSettingsByPageIdRepositoryStub;
};

const makeSut = (): SutTypes => {
  const getPageSettingsByPageIdRepositoryStub =
    new GetPageSettingsByPageIdRepositoryStub();
  const sut = new GetPageSettingsByPageId(
    getPageSettingsByPageIdRepositoryStub
  );
  return {
    sut,
    getPageSettingsByPageIdRepositoryStub,
  };
};

describe('GetPageSettingsByPageIdRepository', () => {
  it('should call GetPageSettingsByPageIdRepository with correct post id', async () => {
    const { sut, getPageSettingsByPageIdRepositoryStub } = makeSut();
    const getPageSettingsByPageIdRepositorySpy = jest.spyOn(
      getPageSettingsByPageIdRepositoryStub,
      'getPageSettingsByPageId'
    );
    const { id } = mockPage();
    await sut.execute(id);
    expect(getPageSettingsByPageIdRepositorySpy).toHaveBeenCalledWith(id);
  });

  it('should return a WorkspaceNotFoundError if GetPostByIdRepository returns null', async () => {
    const { sut, getPageSettingsByPageIdRepositoryStub } = makeSut();
    jest
      .spyOn(getPageSettingsByPageIdRepositoryStub, 'getPageSettingsByPageId')
      .mockReturnValueOnce(Promise.resolve(null));
    const { id } = mockPage();
    const response = await sut.execute(id);
    expect(response).toEqual(new PageNotFoundError());
  });

  it('should return a workspace on success', async () => {
    const { sut } = makeSut();
    const page = mockPage();
    const response = await sut.execute(page.id);
    expect(response).toEqual(page.pageSettings);
  });
});
