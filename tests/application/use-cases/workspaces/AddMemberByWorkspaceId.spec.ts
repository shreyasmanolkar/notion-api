import { WorkspaceNotFoundError } from '@application/errors/WorkspaceNotFoundError';
import { AddMemberByWorkspaceId } from '@application/use-cases/workspaces/AddMemberByWorkspaceId';
import mockWorkspace from '@tests/domain/mock-workspace';
import {
  AddMemberByWorkspaceIdRepositoryStub,
  GetWorkspaceByIdRepositoryStub,
} from '@tests/infrastructure/mocks/workspaces/repositories';

type SutTypes = {
  sut: AddMemberByWorkspaceId;
  getWorkspaceByIdRepositoryStub: GetWorkspaceByIdRepositoryStub;
  addMemberByWorkspaceIdRepositoryStub: AddMemberByWorkspaceIdRepositoryStub;
};

const makesSut = (): SutTypes => {
  const getWorkspaceByIdRepositoryStub = new GetWorkspaceByIdRepositoryStub();
  const addMemberByWorkspaceIdRepositoryStub =
    new AddMemberByWorkspaceIdRepositoryStub();
  const sut = new AddMemberByWorkspaceId(
    getWorkspaceByIdRepositoryStub,
    addMemberByWorkspaceIdRepositoryStub
  );

  return {
    sut,
    getWorkspaceByIdRepositoryStub,
    addMemberByWorkspaceIdRepositoryStub,
  };
};

describe('AddMemberByWorkspaceIdRepository', () => {
  it('should call AddMemberByWorkspaceIdRepository with correct data', async () => {
    const { sut, addMemberByWorkspaceIdRepositoryStub } = makesSut();
    const addMemberByWorkspaceIdRepositorySpy = jest.spyOn(
      addMemberByWorkspaceIdRepositoryStub,
      'addMemberByWorkspaceId'
    );
    const { id } = mockWorkspace();
    const memberId = 'sample-member-2';
    await sut.execute({
      workspaceId: id,
      memberId,
    });

    expect(addMemberByWorkspaceIdRepositorySpy).toHaveBeenCalledWith({
      workspaceId: id,
      memberId,
    });
  });

  it('should return workspace not found error if workspace is not present', async () => {
    const { sut, getWorkspaceByIdRepositoryStub } = makesSut();

    jest
      .spyOn(getWorkspaceByIdRepositoryStub, 'getWorkspaceById')
      .mockReturnValueOnce(Promise.resolve(null));

    const response = await sut.execute({
      workspaceId: 'sample-null-workspace-id',
      memberId: 'sample-member-2',
    });

    expect(response).toEqual(new WorkspaceNotFoundError());
  });
});
