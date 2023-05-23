import { CreateWorkspace } from '@application/use-cases/workspaces/CreateWorkspace';
import mockWorkspace from '@tests/domain/mock-workspace';
import { CreateWorkspaceRepositoryStub } from '@tests/infrastructure/mocks/workspaces/repositories';

type SutTypes = {
  sut: CreateWorkspace;
  createWorkspaceRepositoryStub: CreateWorkspaceRepositoryStub;
};

const makesSut = (): SutTypes => {
  const createWorkspaceRepositoryStub = new CreateWorkspaceRepositoryStub();
  const sut = new CreateWorkspace(createWorkspaceRepositoryStub);

  return {
    sut,
    createWorkspaceRepositoryStub,
  };
};

describe('CreateWorkspace', () => {
  it('should call CreateWorkspaceRepository with correct data', async () => {
    const { sut, createWorkspaceRepositoryStub } = makesSut();

    const createWorkspaceRepositorySpy = jest.spyOn(
      createWorkspaceRepositoryStub,
      'createWorkspace'
    );
    const { name, icon, members, pages } = mockWorkspace();

    const workspaceData = {
      name,
      icon,
      members,
      pages,
    };

    await sut.execute(workspaceData);

    expect(createWorkspaceRepositorySpy).toHaveBeenCalledWith(workspaceData);
  });
});
