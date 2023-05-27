import { PageNotFoundError } from '@application/errors/PageNotFoundError';
import { UpdatePageIconByPageId } from '@application/use-cases/pages/UpdatePageIconByPageId';
import mockPage from '@tests/domain/mock-page';
import {
  GetPageByIdRepositoryStub,
  UpdatePageIconByPageIdRepositoryStub,
} from '@tests/infrastructure/mocks/pages/repositories';

type SutTypes = {
  sut: UpdatePageIconByPageId;
  getPageByIdRepositoryStub: GetPageByIdRepositoryStub;
  updatePageIconByPageIdRepositoryStub: UpdatePageIconByPageIdRepositoryStub;
};

const makeSut = (): SutTypes => {
  const getPageByIdRepositoryStub = new GetPageByIdRepositoryStub();
  const updatePageIconByPageIdRepositoryStub =
    new UpdatePageIconByPageIdRepositoryStub();
  const sut = new UpdatePageIconByPageId(
    getPageByIdRepositoryStub,
    updatePageIconByPageIdRepositoryStub
  );
  return {
    sut,
    getPageByIdRepositoryStub,
    updatePageIconByPageIdRepositoryStub,
  };
};

describe('UpdatePageIconByPageId', () => {
  it('should call UpdatePageIconByPageIdRepository with correct post id', async () => {
    const { sut, updatePageIconByPageIdRepositoryStub } = makeSut();
    const updatePageIconByPageIdRepositorySpy = jest.spyOn(
      updatePageIconByPageIdRepositoryStub,
      'updatePageIconByPageId'
    );
    const { id, icon } = mockPage();
    await sut.execute({
      pageId: id,
      icon,
    });
    expect(updatePageIconByPageIdRepositorySpy).toHaveBeenCalledWith({
      pageId: id,
      icon,
    });
  });

  it('should return a PageIdNotFoundError if GetUserByIdRepository returns null', async () => {
    const { sut, getPageByIdRepositoryStub } = makeSut();
    jest
      .spyOn(getPageByIdRepositoryStub, 'getPageById')
      .mockReturnValueOnce(Promise.resolve(null));

    const { id, icon } = mockPage();
    const response = await sut.execute({
      pageId: id,
      icon,
    });
    expect(response).toEqual(new PageNotFoundError());
  });

  it('should return an updated page on success', async () => {
    const { sut } = makeSut();
    const page = mockPage();

    const response = await sut.execute({
      pageId: page.id,
      icon: page.icon,
    });

    expect(response).toEqual(page);
  });
});
