import { WorkspaceNotFoundError } from '@application/errors/WorkspaceNotFoundError';
import { UpdateWorkspace } from '@application/use-cases/workspaces/UpdateWorkspace';
import mockWorkspace from '@tests/domain/mock-workspace';
import {
  GetWorkspaceByIdRepositoryStub,
  UpdateWorkspaceRepositoryStub,
} from '@tests/infrastructure/mocks/workspaces/repositories';

type SutTypes = {
  sut: UpdateWorkspace;
  getWorkspaceByIdRepositoryStub: GetWorkspaceByIdRepositoryStub;
  updateWorkspaceRepositoryStub: UpdateWorkspaceRepositoryStub;
};

const makeSut = (): SutTypes => {
  const getWorkspaceByIdRepositoryStub = new GetWorkspaceByIdRepositoryStub();
  const updateWorkspaceRepositoryStub = new UpdateWorkspaceRepositoryStub();
  const sut = new UpdateWorkspace(
    getWorkspaceByIdRepositoryStub,
    updateWorkspaceRepositoryStub
  );
  return {
    sut,
    getWorkspaceByIdRepositoryStub,
    updateWorkspaceRepositoryStub,
  };
};

describe('UpdateWorkspace', () => {
  it('should call getWorkspaceByIdRepositoryStub with correct post id', async () => {
    const { sut, updateWorkspaceRepositoryStub } = makeSut();
    const updateWorkspaceRepositorySpy = jest.spyOn(
      updateWorkspaceRepositoryStub,
      'updateWorkspace'
    );
    const { id, name, icon } = mockWorkspace();
    await sut.execute({
      workspaceId: id,
      workspaceData: { name, icon },
    });
    expect(updateWorkspaceRepositorySpy).toHaveBeenCalledWith({
      workspaceId: id,
      workspaceData: { name, icon },
    });
  });

  it('should return a WorkspaceIdNorFoundError if GetUserByIdRepository returns null', async () => {
    const { sut, getWorkspaceByIdRepositoryStub } = makeSut();
    jest
      .spyOn(getWorkspaceByIdRepositoryStub, 'getWorkspaceById')
      .mockReturnValueOnce(Promise.resolve(null));

    const { id, name, icon } = mockWorkspace();
    const response = await sut.execute({
      workspaceId: id,
      workspaceData: { name, icon },
    });
    expect(response).toEqual(new WorkspaceNotFoundError());
  });

  it('should return an updated workspace on success', async () => {
    const { sut } = makeSut();
    const workspace = mockWorkspace();
    const { id, name, icon } = mockWorkspace();

    const response = await sut.execute({
      workspaceId: id,
      workspaceData: { name, icon },
    });

    expect(response).toEqual(workspace);
  });
});
