import { WorkspaceNotFoundError } from '@application/errors/WorkspaceNotFoundError';
import { RemovePageIdFromFavoritesByWorkspaceId } from '@application/use-cases/users/RemovePageIdFromFavoritesByWorkspaceId';
import mockUser from '@tests/domain/mock-user';
import {
  GetWorkspacesByUserIdRepositoryStub,
  RemovePageIdFromFavoritesByWorkspaceIdRepositoryStub,
} from '@tests/infrastructure/mocks/users/repositories';

type SutTypes = {
  sut: RemovePageIdFromFavoritesByWorkspaceId;
  getWorkspacesByUserIdRepositoryStub: GetWorkspacesByUserIdRepositoryStub;
  removePageIdFromFavoritesByWorkspaceIdRepositoryStub: RemovePageIdFromFavoritesByWorkspaceIdRepositoryStub;
};

const makesSut = (): SutTypes => {
  const getWorkspacesByUserIdRepositoryStub =
    new GetWorkspacesByUserIdRepositoryStub();
  const removePageIdFromFavoritesByWorkspaceIdRepositoryStub =
    new RemovePageIdFromFavoritesByWorkspaceIdRepositoryStub();
  const sut = new RemovePageIdFromFavoritesByWorkspaceId(
    getWorkspacesByUserIdRepositoryStub,
    removePageIdFromFavoritesByWorkspaceIdRepositoryStub
  );

  return {
    sut,
    getWorkspacesByUserIdRepositoryStub,
    removePageIdFromFavoritesByWorkspaceIdRepositoryStub,
  };
};

describe('RemovePageIdFromFavoritesByWorkspaceId', () => {
  it('should call removePageIdFromFavoritesByWorkspaceIdRepository with correct data', async () => {
    const { sut, removePageIdFromFavoritesByWorkspaceIdRepositoryStub } =
      makesSut();
    const removePageIdFromFavoritesByWorkspaceIdRepositorySpy = jest.spyOn(
      removePageIdFromFavoritesByWorkspaceIdRepositoryStub,
      'removePageIdFromFavoritesByWorkspaceId'
    );
    const { id, workspaces } = mockUser();
    const { workspaceId } = workspaces[0];
    await sut.execute({ userId: id, workspaceId, pageId: 'sample-page-1' });

    expect(
      removePageIdFromFavoritesByWorkspaceIdRepositorySpy
    ).toHaveBeenCalledWith({
      userId: id,
      workspaceId,
      pageId: 'sample-page-1',
    });
  });

  it('should return workspace not found error if workspace is not verified', async () => {
    const { sut } = makesSut();
    const { id } = mockUser();

    const response = await sut.execute({
      userId: id,
      workspaceId: 'other_workspace_id',
      pageId: 'sample-page-1',
    });

    expect(response).toEqual(new WorkspaceNotFoundError());
  });
});
