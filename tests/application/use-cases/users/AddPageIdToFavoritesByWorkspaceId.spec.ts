import { WorkspaceNotFoundError } from '@application/errors/WorkspaceNotFoundError';
import { AddPageIdToFavoritesByWorkspaceId } from '@application/use-cases/users/AddPageIdToFavoritesByWorkspaceId';
import mockUser from '@tests/domain/mock-user';
import {
  AddPageIdToFavoritesByWorkspaceIdRepositoryStub,
  GetWorkspacesByUserIdRepositoryStub,
} from '@tests/infrastructure/mocks/users/repositories';

type SutTypes = {
  sut: AddPageIdToFavoritesByWorkspaceId;
  getWorkspacesByUserIdRepositoryStub: GetWorkspacesByUserIdRepositoryStub;
  addPageIdToFavoritesByWorkspaceIdRepositoryStub: AddPageIdToFavoritesByWorkspaceIdRepositoryStub;
};

const makesSut = (): SutTypes => {
  const getWorkspacesByUserIdRepositoryStub =
    new GetWorkspacesByUserIdRepositoryStub();
  const addPageIdToFavoritesByWorkspaceIdRepositoryStub =
    new AddPageIdToFavoritesByWorkspaceIdRepositoryStub();
  const sut = new AddPageIdToFavoritesByWorkspaceId(
    getWorkspacesByUserIdRepositoryStub,
    addPageIdToFavoritesByWorkspaceIdRepositoryStub
  );

  return {
    sut,
    getWorkspacesByUserIdRepositoryStub,
    addPageIdToFavoritesByWorkspaceIdRepositoryStub,
  };
};

describe('AddPageIdToFavoritesByWorkspaceId', () => {
  it('should call AddPageIdToFavoritesByWorkspaceId with correct data', async () => {
    const { sut, addPageIdToFavoritesByWorkspaceIdRepositoryStub } = makesSut();
    const addPageIdToFavoritesByWorkspaceIdRepositorySpy = jest.spyOn(
      addPageIdToFavoritesByWorkspaceIdRepositoryStub,
      'addPageIdToFavoritesByWorkspaceId'
    );
    const { id, workspaces } = mockUser();
    const { workspaceId } = workspaces[0];
    await sut.execute({ userId: id, workspaceId, pageId: 'sample-page-2' });

    expect(addPageIdToFavoritesByWorkspaceIdRepositorySpy).toHaveBeenCalledWith(
      {
        userId: id,
        workspaceId,
        pageId: 'sample-page-2',
      }
    );
  });

  it('should return workspace not found error if workspace is not verified', async () => {
    const { sut } = makesSut();
    const { id } = mockUser();

    const response = await sut.execute({
      userId: id,
      workspaceId: 'other_workspace_id',
      pageId: 'sample-page-2',
    });

    expect(response).toEqual(new WorkspaceNotFoundError());
  });
});
