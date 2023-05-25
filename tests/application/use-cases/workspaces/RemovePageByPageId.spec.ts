import { WorkspaceNotFoundError } from '@application/errors/WorkspaceNotFoundError';
import { RemovePageByPageId } from '@application/use-cases/workspaces/RemovePageByPageId';
import mockWorkspace from '@tests/domain/mock-workspace';
import {
  GetWorkspaceByIdRepositoryStub,
  RemovePageByPageIdRepositoryStub,
} from '@tests/infrastructure/mocks/workspaces/repositories';

type SutTypes = {
  sut: RemovePageByPageId;
  getWorkspaceByIdRepositoryStub: GetWorkspaceByIdRepositoryStub;
  removePageByPageIdRepositoryStub: RemovePageByPageIdRepositoryStub;
};

const makesSut = (): SutTypes => {
  const getWorkspaceByIdRepositoryStub = new GetWorkspaceByIdRepositoryStub();
  const removePageByPageIdRepositoryStub =
    new RemovePageByPageIdRepositoryStub();
  const sut = new RemovePageByPageId(
    getWorkspaceByIdRepositoryStub,
    removePageByPageIdRepositoryStub
  );

  return {
    sut,
    getWorkspaceByIdRepositoryStub,
    removePageByPageIdRepositoryStub,
  };
};

describe('RemovePageByPageId', () => {
  it('should call RemovePageByPageIdRepository with correct data', async () => {
    const { sut, removePageByPageIdRepositoryStub } = makesSut();
    const removePageByPageIdRepositorySpy = jest.spyOn(
      removePageByPageIdRepositoryStub,
      'removePageByPageId'
    );
    const { id } = mockWorkspace();
    const pageId = 'sample-page-id';

    await sut.execute({
      workspaceId: id,
      pageId,
    });

    expect(removePageByPageIdRepositorySpy).toHaveBeenCalledWith({
      workspaceId: id,
      pageId,
    });
  });

  it('should return a WorkspaceNotFoundError if workspace is not present', async () => {
    const { sut, getWorkspaceByIdRepositoryStub } = makesSut();
    jest
      .spyOn(getWorkspaceByIdRepositoryStub, 'getWorkspaceById')
      .mockReturnValueOnce(Promise.resolve(null));

    const { id } = mockWorkspace();
    const pageId = 'sample-page-id';

    const response = await sut.execute({ workspaceId: id, pageId });
    expect(response).toEqual(new WorkspaceNotFoundError());
  });
});
