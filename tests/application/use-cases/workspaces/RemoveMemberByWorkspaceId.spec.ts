import { WorkspaceNotFoundError } from '@application/errors/WorkspaceNotFoundError';
import { RemoveMemberByWorkspaceId } from '@application/use-cases/workspaces/RemoveMemberByWorkspaceId';
import mockWorkspace from '@tests/domain/mock-workspace';
import {
  GetWorkspaceByIdRepositoryStub,
  RemoveMemberByWorkspaceIdRepositoryStub,
} from '@tests/infrastructure/mocks/workspaces/repositories';

type SutTypes = {
  sut: RemoveMemberByWorkspaceId;
  getWorkspaceByIdRepositoryStub: GetWorkspaceByIdRepositoryStub;
  removeMemberByWorkspaceIdRepositoryStub: RemoveMemberByWorkspaceIdRepositoryStub;
};

const makesSut = (): SutTypes => {
  const getWorkspaceByIdRepositoryStub = new GetWorkspaceByIdRepositoryStub();
  const removeMemberByWorkspaceIdRepositoryStub =
    new RemoveMemberByWorkspaceIdRepositoryStub();
  const sut = new RemoveMemberByWorkspaceId(
    getWorkspaceByIdRepositoryStub,
    removeMemberByWorkspaceIdRepositoryStub
  );

  return {
    sut,
    getWorkspaceByIdRepositoryStub,
    removeMemberByWorkspaceIdRepositoryStub,
  };
};

describe('RemoveMemberByWorkspaceId', () => {
  it('should call removePageIdFromFavoritesByWorkspaceIdRepository with correct data', async () => {
    const { sut, removeMemberByWorkspaceIdRepositoryStub } = makesSut();
    const removeMemberByWorkspaceIdRepositorySpy = jest.spyOn(
      removeMemberByWorkspaceIdRepositoryStub,
      'removeMemberByWorkspaceId'
    );
    const { id } = mockWorkspace();
    const memberId = 'sample-member-id';

    await sut.execute({
      workspaceId: id,
      memberId,
    });

    expect(removeMemberByWorkspaceIdRepositorySpy).toHaveBeenCalledWith({
      workspaceId: id,
      memberId,
    });
  });

  it('should return a WorkspaceNotFoundError if workspace is not present', async () => {
    const { sut, getWorkspaceByIdRepositoryStub } = makesSut();
    jest
      .spyOn(getWorkspaceByIdRepositoryStub, 'getWorkspaceById')
      .mockReturnValueOnce(Promise.resolve(null));

    const { id } = mockWorkspace();
    const memberId = 'sample-member-id';

    const response = await sut.execute({ workspaceId: id, memberId });
    expect(response).toEqual(new WorkspaceNotFoundError());
  });
});
