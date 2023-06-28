import { WorkspaceNotFoundError } from '@application/errors/WorkspaceNotFoundError';
import { GetAllRootPages } from '@application/use-cases/workspaces/GetAllRootPages';
import mockWorkspace from '@tests/domain/mock-workspace';
import {
  GetAllRootPagesRepositoryStub,
  GetWorkspaceByIdRepositoryStub,
} from '@tests/infrastructure/mocks/workspaces/repositories';

type SutTypes = {
  sut: GetAllRootPages;
  getWorkspaceByIdRepositoryStub: GetWorkspaceByIdRepositoryStub;
  getAllRootPagesRepositoryStub: GetAllRootPagesRepositoryStub;
};

const makeSut = (): SutTypes => {
  const getWorkspaceByIdRepositoryStub = new GetWorkspaceByIdRepositoryStub();
  const getAllRootPagesRepositoryStub = new GetAllRootPagesRepositoryStub();
  const sut = new GetAllRootPages(
    getWorkspaceByIdRepositoryStub,
    getAllRootPagesRepositoryStub
  );
  return {
    sut,
    getWorkspaceByIdRepositoryStub,
    getAllRootPagesRepositoryStub,
  };
};

describe('GetAllRootPages', () => {
  it('should call GetAllRootPagesRepository with correct data', async () => {
    const { sut, getAllRootPagesRepositoryStub } = makeSut();
    const getAllRootPagesRepositorySpy = jest.spyOn(
      getAllRootPagesRepositoryStub,
      'getAllRootPages'
    );
    const { id } = mockWorkspace();
    await sut.execute(id);
    expect(getAllRootPagesRepositorySpy).toHaveBeenCalledWith(id);
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

    expect(response).toEqual([
      {
        id: 'sample-page-1',
        reference: 'sample-page-reference',
        icon: 'icon-hex',
        path: null,
        title: 'sample-page-reference',
        createdAt: new Date(),
      },
      {
        id: 'sample-page-2',
        reference: 'sample-page-reference-2',
        icon: 'icon-hex',
        path: null,
        title: 'sample-page-reference',
        createdAt: new Date(),
      },
      {
        id: 'sample-page-3',
        reference: 'sample-page-reference-3',
        icon: 'icon-hex',
        path: null,
        title: 'sample-page-reference',
        createdAt: new Date(),
      },
    ]);
  });
});
