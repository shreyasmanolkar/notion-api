import { DeleteWorkspace } from '@application/use-cases/workspaces/DeleteWorkspace';
import mockWorkspace from '@tests/domain/mock-workspace';
import { DeleteWorkspaceRepositoryStub } from '@tests/infrastructure/mocks/workspaces/repositories';

type SutTypes = {
  sut: DeleteWorkspace;
  deleteWorkspaceRepositoryStub: DeleteWorkspaceRepositoryStub;
};

const makeSut = (): SutTypes => {
  const deleteWorkspaceRepositoryStub = new DeleteWorkspaceRepositoryStub();
  const sut = new DeleteWorkspace(deleteWorkspaceRepositoryStub);
  return {
    sut,
    deleteWorkspaceRepositoryStub,
  };
};

describe('DeleteWorkspace', () => {
  it('should call DeleteWorkspaceRepository with correct user id', async () => {
    const { sut, deleteWorkspaceRepositoryStub } = makeSut();
    const deleteWorkspaceRepositorySpy = jest.spyOn(
      deleteWorkspaceRepositoryStub,
      'deleteWorkspace'
    );
    const { id } = mockWorkspace();
    await sut.execute(id);
    expect(deleteWorkspaceRepositorySpy).toHaveBeenCalledWith(id);
  });
});
