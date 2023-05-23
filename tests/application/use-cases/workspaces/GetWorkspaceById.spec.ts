import { WorkspaceNotFoundError } from '@application/errors/WorkspaceNotFoundError';
import { GetWorkspaceById } from '@application/use-cases/workspaces/GetWorkspaceById';
import mockWorkspace from '@tests/domain/mock-workspace';
import { GetWorkspaceByIdRepositoryStub } from '@tests/infrastructure/mocks/workspaces/repositories';

type SutTypes = {
  sut: GetWorkspaceById;
  getWorkspaceByIdRepositoryStub: GetWorkspaceByIdRepositoryStub;
};

const makeSut = (): SutTypes => {
  const getWorkspaceByIdRepositoryStub = new GetWorkspaceByIdRepositoryStub();
  const sut = new GetWorkspaceById(getWorkspaceByIdRepositoryStub);
  return {
    sut,
    getWorkspaceByIdRepositoryStub,
  };
};

describe('GetWorkspaceById', () => {
  it('should call GetWorkspaceByIdRepsoitory with correct post id', async () => {
    const { sut, getWorkspaceByIdRepositoryStub } = makeSut();
    const getWorkspaceByIdRepositorySpy = jest.spyOn(
      getWorkspaceByIdRepositoryStub,
      'getWorkspaceById'
    );
    const { id } = mockWorkspace();
    await sut.execute(id);
    expect(getWorkspaceByIdRepositorySpy).toHaveBeenCalledWith(id);
  });

  it('should return a WorkspaceNotFoundError if GetPostByIdRepository returns null', async () => {
    const { sut, getWorkspaceByIdRepositoryStub } = makeSut();
    jest
      .spyOn(getWorkspaceByIdRepositoryStub, 'getWorkspaceById')
      .mockReturnValueOnce(Promise.resolve(null));
    const { id } = mockWorkspace();
    const response = await sut.execute(id);
    expect(response).toEqual(new WorkspaceNotFoundError());
  });

  it('should return a workspace on success', async () => {
    const { sut } = makeSut();
    const workspace = mockWorkspace();
    const response = await sut.execute(workspace.id);
    expect(response).toEqual(workspace);
  });
});
