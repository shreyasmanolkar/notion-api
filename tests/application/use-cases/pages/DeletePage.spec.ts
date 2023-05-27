import { DeletePage } from '@application/use-cases/pages/DeletePage';
import mockPage from '@tests/domain/mock-page';
import { DeletePageRepositoryStub } from '@tests/infrastructure/mocks/pages/repositories';

type SutTypes = {
  sut: DeletePage;
  deletePageRepositoryStub: DeletePageRepositoryStub;
};

const makeSut = (): SutTypes => {
  const deletePageRepositoryStub = new DeletePageRepositoryStub();
  const sut = new DeletePage(deletePageRepositoryStub);
  return {
    sut,
    deletePageRepositoryStub,
  };
};

describe('DeletePage', () => {
  it('should call DeletePageRepository with correct user id', async () => {
    const { sut, deletePageRepositoryStub } = makeSut();
    const deletePageRepositorySpy = jest.spyOn(
      deletePageRepositoryStub,
      'deletePage'
    );
    const { id } = mockPage();
    await sut.execute(id);
    expect(deletePageRepositorySpy).toHaveBeenCalledWith(id);
  });
});
