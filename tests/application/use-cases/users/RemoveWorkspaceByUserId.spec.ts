import { RemoveWorkspaceByUserId } from '@application/use-cases/users/RemoveWorkspaceByUserId';
import mockUser from '@tests/domain/mock-user';
import { RemoveWorkspaceByUserIdRepositoryStub } from '@tests/infrastructure/mocks/users/repositories';

type SutTypes = {
  sut: RemoveWorkspaceByUserId;
  removeWorkspaceByUserIdRepositoryStub: RemoveWorkspaceByUserIdRepositoryStub;
};

const makesSut = (): SutTypes => {
  const removeWorkspaceByUserIdRepositoryStub =
    new RemoveWorkspaceByUserIdRepositoryStub();
  const sut = new RemoveWorkspaceByUserId(
    removeWorkspaceByUserIdRepositoryStub
  );

  return {
    sut,
    removeWorkspaceByUserIdRepositoryStub,
  };
};

describe('RemoveWorkspaceByUserId', () => {
  it('should call removeWorkspaceByUserIdRepository with correct data', async () => {
    const { sut, removeWorkspaceByUserIdRepositoryStub } = makesSut();
    const removeWorkspaceByUserIdRepositorySpy = jest.spyOn(
      removeWorkspaceByUserIdRepositoryStub,
      'removeWorkspaceByUserId'
    );
    const { id, workspaces } = mockUser();
    const { workspaceId } = workspaces[0];
    await sut.execute({ userId: id, workspaceId });

    expect(removeWorkspaceByUserIdRepositorySpy).toHaveBeenCalledWith({
      userId: id,
      workspaceId,
    });
  });
});
