import { WorkspaceNotFoundError } from '@application/errors/WorkspaceNotFoundError';
import { GetChildrensByPageReference } from '@application/use-cases/workspaces/GetChildrensByPageReference';
import mockWorkspace from '@tests/domain/mock-workspace';
import {
  GetChildrensByPageReferenceRepositoryStub,
  GetWorkspaceByIdRepositoryStub,
} from '@tests/infrastructure/mocks/workspaces/repositories';

type SutTypes = {
  sut: GetChildrensByPageReference;
  getWorkspaceByIdRepositoryStub: GetWorkspaceByIdRepositoryStub;
  getChildrensByPageReferenceRepositoryStub: GetChildrensByPageReferenceRepositoryStub;
};

const makeSut = (): SutTypes => {
  const getWorkspaceByIdRepositoryStub = new GetWorkspaceByIdRepositoryStub();
  const getChildrensByPageReferenceRepositoryStub =
    new GetChildrensByPageReferenceRepositoryStub();
  const sut = new GetChildrensByPageReference(
    getWorkspaceByIdRepositoryStub,
    getChildrensByPageReferenceRepositoryStub
  );
  return {
    sut,
    getWorkspaceByIdRepositoryStub,
    getChildrensByPageReferenceRepositoryStub,
  };
};

describe('GetChildrensByPageId', () => {
  it('should call GetChildrensByPageIdRepository with correct data', async () => {
    const { sut, getChildrensByPageReferenceRepositoryStub } = makeSut();
    const getChildrensByPageReferenceRepositorySpy = jest.spyOn(
      getChildrensByPageReferenceRepositoryStub,
      'getChildrensByPageId'
    );

    const { id } = mockWorkspace();
    const pageReference = 'sample-page-reference';

    await sut.execute({
      workspaceId: id,
      pageReference,
    });
    expect(getChildrensByPageReferenceRepositorySpy).toHaveBeenCalledWith({
      workspaceId: id,
      pageReference,
    });
  });

  it('should return a WorkspaceNotFoundError if workspace is not present', async () => {
    const { sut, getWorkspaceByIdRepositoryStub } = makeSut();
    jest
      .spyOn(getWorkspaceByIdRepositoryStub, 'getWorkspaceById')
      .mockReturnValueOnce(Promise.resolve(null));

    const { id } = mockWorkspace();
    const pageReference = 'sample-page-reference';

    const response = await sut.execute({
      workspaceId: id,
      pageReference,
    });

    expect(response).toEqual(new WorkspaceNotFoundError());
  });

  it('should return a array of members on success', async () => {
    const { sut } = makeSut();
    const { id } = mockWorkspace();
    const pageReference = 'sample-page-reference';

    const response = await sut.execute({
      workspaceId: id,
      pageReference,
    });

    expect(response).toEqual([
      {
        id: 'sample-page-1',
        reference: 'sample-page-reference-1',
        icon: 'icon-hex',
        path: ',sample-page-reference-0,',
        title: 'sample-page-reference',
        createdAt: new Date(),
      },
      {
        id: 'sample-page-2',
        reference: 'sample-page-reference-2',
        icon: 'icon-hex',
        path: ',sample-page-reference-0,',
        title: 'sample-page-reference',
        createdAt: new Date(),
      },
    ]);
  });
});
