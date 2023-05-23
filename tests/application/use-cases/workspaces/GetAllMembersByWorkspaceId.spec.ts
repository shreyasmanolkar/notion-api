import { WorkspaceNotFoundError } from '@application/errors/WorkspaceNotFoundError';
import { GetAllMembersByWorkspaceId } from '@application/use-cases/workspaces/GetAllMembersByWorkspaceId';
import mockWorkspace from '@tests/domain/mock-workspace';
import {
  GetAllMembersByWorkspaceIdRepositoryStub,
  GetWorkspaceByIdRepositoryStub,
} from '@tests/infrastructure/mocks/workspaces/repositories';

type SutTypes = {
  sut: GetAllMembersByWorkspaceId;
  getWorkspaceByIdRepositoryStub: GetWorkspaceByIdRepositoryStub;
  getAllMembersByWorkspaceIdRepositoryStub: GetAllMembersByWorkspaceIdRepositoryStub;
};

const makeSut = (): SutTypes => {
  const getWorkspaceByIdRepositoryStub = new GetWorkspaceByIdRepositoryStub();
  const getAllMembersByWorkspaceIdRepositoryStub =
    new GetAllMembersByWorkspaceIdRepositoryStub();
  const sut = new GetAllMembersByWorkspaceId(
    getWorkspaceByIdRepositoryStub,
    getAllMembersByWorkspaceIdRepositoryStub
  );
  return {
    sut,
    getWorkspaceByIdRepositoryStub,
    getAllMembersByWorkspaceIdRepositoryStub,
  };
};

describe('GetAllMembersByWorkspaceId', () => {
  it('should call GetAllMembersByWorkspaceIdRepository with correct data', async () => {
    const { sut, getAllMembersByWorkspaceIdRepositoryStub } = makeSut();
    const getAllMembersByWorkspaceIdRepositorySpy = jest.spyOn(
      getAllMembersByWorkspaceIdRepositoryStub,
      'getAllMembersByWorkspaceId'
    );
    const { id } = mockWorkspace();
    await sut.execute(id);
    expect(getAllMembersByWorkspaceIdRepositorySpy).toHaveBeenCalledWith(id);
  });

  it('should return a WorkspaceNotFoundError if workspace is not present', async () => {
    const { sut, getWorkspaceByIdRepositoryStub } = makeSut();
    jest
      .spyOn(getWorkspaceByIdRepositoryStub, 'getWorkspaceById')
      .mockReturnValueOnce(Promise.resolve(null));
    const { id } = mockWorkspace();
    const response = await sut.execute(id);
    expect(response).toEqual(new WorkspaceNotFoundError());
  });

  it('should return a array of members on success', async () => {
    const { sut } = makeSut();
    const workspace = mockWorkspace();

    const response = await sut.execute(workspace.id);

    expect(response).toEqual(['sample-member-1', 'sample-member-2']);
  });
});
