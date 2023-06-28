import { WorkspaceNotFoundError } from '@application/errors/WorkspaceNotFoundError';
import { AddPage } from '@application/use-cases/workspaces/AddPage';
import mockWorkspace from '@tests/domain/mock-workspace';
import {
  AddPageRepositoryStub,
  GetWorkspaceByIdRepositoryStub,
} from '@tests/infrastructure/mocks/workspaces/repositories';

type SutTypes = {
  sut: AddPage;
  getWorkspaceByIdRepositoryStub: GetWorkspaceByIdRepositoryStub;
  addPageRepositoryStub: AddPageRepositoryStub;
};

const makesSut = (): SutTypes => {
  const getWorkspaceByIdRepositoryStub = new GetWorkspaceByIdRepositoryStub();
  const addPageRepositoryStub = new AddPageRepositoryStub();
  const sut = new AddPage(
    getWorkspaceByIdRepositoryStub,
    addPageRepositoryStub
  );

  return {
    sut,
    getWorkspaceByIdRepositoryStub,
    addPageRepositoryStub,
  };
};

describe('AddPage', () => {
  it('should call AddPageRepository with correct data', async () => {
    const { sut, addPageRepositoryStub } = makesSut();
    const addPageRepositorySpy = jest.spyOn(addPageRepositoryStub, 'addPage');
    const { id } = mockWorkspace();
    const pageData = {
      id: 'sample-new-page-1',
      reference: 'sample-page-reference',
      icon: 'sample-hex',
      path: null,
      title: 'smaple-new-page',
      createdAt: new Date(),
    };

    await sut.execute({
      workspaceId: id,
      pageData,
    });

    expect(addPageRepositorySpy).toHaveBeenCalledWith({
      workspaceId: id,
      pageData,
    });
  });

  it('should return workspace not found error if workspace is not present', async () => {
    const { sut, getWorkspaceByIdRepositoryStub } = makesSut();

    jest
      .spyOn(getWorkspaceByIdRepositoryStub, 'getWorkspaceById')
      .mockReturnValueOnce(Promise.resolve(null));

    const response = await sut.execute({
      workspaceId: 'sample-null-workspace-id',
      pageData: {
        id: 'sample-new-page-1',
        reference: 'sample-page-reference',
        icon: 'sample-hex',
        path: null,
        title: 'sample-page-reference',
        createdAt: new Date(),
      },
    });

    expect(response).toEqual(new WorkspaceNotFoundError());
  });
});
