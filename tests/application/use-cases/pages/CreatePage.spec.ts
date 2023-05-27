import { CreatePage } from '@application/use-cases/pages/CreatePage';
import mockPage from '@tests/domain/mock-page';
import { CreatePageRepositoryStub } from '@tests/infrastructure/mocks/pages/repositories';

type SutTypes = {
  sut: CreatePage;
  createPageRepositoryStub: CreatePageRepositoryStub;
};

const makesSut = (): SutTypes => {
  const createPageRepositoryStub = new CreatePageRepositoryStub();
  const sut = new CreatePage(createPageRepositoryStub);

  return {
    sut,
    createPageRepositoryStub,
  };
};

describe('createPage', () => {
  it('should call createPageRepository with correct data', async () => {
    const { sut, createPageRepositoryStub } = makesSut();

    const createPageRepositorySpy = jest.spyOn(
      createPageRepositoryStub,
      'createPage'
    );

    const {
      title,
      icon,
      coverPicture,
      content,
      favorite,
      pageSettings,
      path,
      workspaceId,
    } = mockPage();

    const pageData = {
      title,
      icon,
      coverPicture,
      content,
      favorite,
      pageSettings,
      path,
      workspaceId,
    };

    await sut.execute(pageData);

    expect(createPageRepositorySpy).toHaveBeenCalledWith(pageData);
  });
});
