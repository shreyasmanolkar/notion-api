import { PageNotFoundError } from '@application/errors/PageNotFoundError';
import { UpdatePageSettingsByPageId } from '@application/use-cases/pages/UpdatePageSettingsByPageId';
import mockPage from '@tests/domain/mock-page';
import {
  GetPageByIdRepositoryStub,
  UpdatePageSettingsByPageIdRepositoryStub,
} from '@tests/infrastructure/mocks/pages/repositories';

type SutTypes = {
  sut: UpdatePageSettingsByPageId;
  getPageByIdRepositoryStub: GetPageByIdRepositoryStub;
  updatePageSettingsByPageIdRepositoryStub: UpdatePageSettingsByPageIdRepositoryStub;
};

const makeSut = (): SutTypes => {
  const getPageByIdRepositoryStub = new GetPageByIdRepositoryStub();
  const updatePageSettingsByPageIdRepositoryStub =
    new UpdatePageSettingsByPageIdRepositoryStub();
  const sut = new UpdatePageSettingsByPageId(
    getPageByIdRepositoryStub,
    updatePageSettingsByPageIdRepositoryStub
  );
  return {
    sut,
    getPageByIdRepositoryStub,
    updatePageSettingsByPageIdRepositoryStub,
  };
};

describe('updatePageSettingsByPageId', () => {
  it('should call updatePageSettingsByPageIdRepositor with correct post id', async () => {
    const { sut, updatePageSettingsByPageIdRepositoryStub } = makeSut();
    const updatePageSettingsByPageIdRepositorySpy = jest.spyOn(
      updatePageSettingsByPageIdRepositoryStub,
      'updatePageSettingsByPageId'
    );
    const { id, pageSettings } = mockPage();
    await sut.execute({
      pageId: id,
      settings: pageSettings,
    });
    expect(updatePageSettingsByPageIdRepositorySpy).toHaveBeenCalledWith({
      pageId: id,
      pageSettings,
    });
  });

  it('should return a PageIdNotFoundError if GetUserByIdRepository returns null', async () => {
    const { sut, getPageByIdRepositoryStub } = makeSut();
    jest
      .spyOn(getPageByIdRepositoryStub, 'getPageById')
      .mockReturnValueOnce(Promise.resolve(null));

    const { id, pageSettings } = mockPage();
    const response = await sut.execute({
      pageId: id,
      settings: pageSettings,
    });
    expect(response).toEqual(new PageNotFoundError());
  });

  it('should return an updated page on success', async () => {
    const { sut } = makeSut();
    const page = mockPage();

    const response = await sut.execute({
      pageId: page.id,
      settings: page.pageSettings,
    });

    expect(response).toEqual(page);
  });
});
