import { DeletePagesByWorkspaceId } from '@application/use-cases/pages/DeletePagesByWorkspaceId';
import mockPage from '@tests/domain/mock-page';
import { DeletePagesByWorkspaceIdRepositoryStub } from '@tests/infrastructure/mocks/pages/repositories';

type SutTypes = {
  sut: DeletePagesByWorkspaceId;
  deletePagesByWorkspaceIdRepositoryStub: DeletePagesByWorkspaceIdRepositoryStub;
};

const makeSut = (): SutTypes => {
  const deletePagesByWorkspaceIdRepositoryStub =
    new DeletePagesByWorkspaceIdRepositoryStub();
  const sut = new DeletePagesByWorkspaceId(
    deletePagesByWorkspaceIdRepositoryStub
  );
  return {
    sut,
    deletePagesByWorkspaceIdRepositoryStub,
  };
};

describe('DeletePagesByWorkspaceId', () => {
  it('should call DeletePagesByWorkspaceIdRepository with correct user id', async () => {
    const { sut, deletePagesByWorkspaceIdRepositoryStub } = makeSut();
    const deletePagesByWorkspaceIdRepositorySpy = jest.spyOn(
      deletePagesByWorkspaceIdRepositoryStub,
      'deletePagesByWorkspaceId'
    );
    const { workspaceId } = mockPage();
    await sut.execute(workspaceId);
    expect(deletePagesByWorkspaceIdRepositorySpy).toHaveBeenCalledWith(
      workspaceId
    );
  });
});
