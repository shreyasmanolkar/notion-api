import { WorkspaceNotFoundError } from '@application/errors/WorkspaceNotFoundError';
import { GetFavoritesByWorkspaceId } from '@application/use-cases/users/GetFavoritesByWorkspaceId';
import mockUser from '@tests/domain/mock-user';
import {
  GetFavoritesByWorkspaceIdRepositoryStub,
  GetWorkspacesByUserIdRepositoryStub,
} from '@tests/infrastructure/mocks/users/repositories';

type SutTypes = {
  sut: GetFavoritesByWorkspaceId;
  getWorkspacesByUserIdRepositoryStub: GetWorkspacesByUserIdRepositoryStub;
  getFavotitesByWorkspaceIdRepositoryStub: GetFavoritesByWorkspaceIdRepositoryStub;
};

const makeSut = (): SutTypes => {
  const getWorkspacesByUserIdRepositoryStub =
    new GetWorkspacesByUserIdRepositoryStub();
  const getFavotitesByWorkspaceIdRepositoryStub =
    new GetFavoritesByWorkspaceIdRepositoryStub();
  const sut = new GetFavoritesByWorkspaceId(
    getWorkspacesByUserIdRepositoryStub,
    getFavotitesByWorkspaceIdRepositoryStub
  );
  return {
    sut,
    getWorkspacesByUserIdRepositoryStub,
    getFavotitesByWorkspaceIdRepositoryStub,
  };
};

describe('GetFavoritesByWorkspaceId', () => {
  it('should call GetFavoritesByWorkspaceIdRepository with correct post id', async () => {
    const { sut, getFavotitesByWorkspaceIdRepositoryStub } = makeSut();
    const getFavotitesByWorkspaceIdRepositorySpy = jest.spyOn(
      getFavotitesByWorkspaceIdRepositoryStub,
      'getFavoritesByWorkspaceId'
    );
    const { id, workspaces } = mockUser();
    const { workspaceId } = workspaces[0];

    await sut.execute({ userId: id, workspaceId });
    expect(getFavotitesByWorkspaceIdRepositorySpy).toHaveBeenCalledWith({
      userId: id,
      workspaceId,
    });
  });

  it('should return workspace not found error if workspace is not verified', async () => {
    const { sut } = makeSut();
    const { id } = mockUser();

    const response = await sut.execute({
      userId: id,
      workspaceId: 'other_workspace_id',
    });

    expect(response).toEqual(new WorkspaceNotFoundError());
  });

  it('should return a favorites on success', async () => {
    const { sut } = makeSut();
    const { id, workspaces } = mockUser();
    const { workspaceId, favorites } = workspaces[0];

    const response = await sut.execute({ userId: id, workspaceId });
    expect(response).toEqual(favorites);
  });
});
