import { ForbiddenError } from '@application/errors/ForbiddenError';
import { PageNotFoundError } from '@application/errors/PageNotFoundError';
import { Authorization } from '@application/use-cases/pages/Authorization';
import { GetPageByIdRepositoryStub } from '@tests/infrastructure/mocks/pages/repositories';
import { GetWorkspacesByUserIdRepositoryStub } from '@tests/infrastructure/mocks/users/repositories';

type SutTypes = {
  sut: Authorization;
  getPageByIdRepositoryStub: GetPageByIdRepositoryStub;
  getWorkspaceByUserIdRepositoryStub: GetWorkspacesByUserIdRepositoryStub;
};

const makesSut = (): SutTypes => {
  const getPageByIdRepositoryStub = new GetPageByIdRepositoryStub();
  const getWorkspaceByUserIdRepositoryStub =
    new GetWorkspacesByUserIdRepositoryStub();
  const sut = new Authorization(
    getPageByIdRepositoryStub,
    getWorkspaceByUserIdRepositoryStub
  );

  return {
    sut,
    getPageByIdRepositoryStub,
    getWorkspaceByUserIdRepositoryStub,
  };
};

describe('Authorization', () => {
  it('should call getWorkspacesByUserIdRepository with correct data', async () => {
    const { sut, getWorkspaceByUserIdRepositoryStub } = makesSut();
    const getWorkspaceByUserIdRepositorySpy = jest.spyOn(
      getWorkspaceByUserIdRepositoryStub,
      'getWorkspacesByUserId'
    );
    const userId = 'sample-user-id';
    const pageId = 'sample-page-id';
    await sut.execute({ userId, pageId });

    expect(getWorkspaceByUserIdRepositorySpy).toHaveBeenCalledWith(userId);
  });

  it('should call getPageByIdRepository with correct data', async () => {
    const { sut, getPageByIdRepositoryStub } = makesSut();
    const getPageByIdRepositorySpy = jest.spyOn(
      getPageByIdRepositoryStub,
      'getPageById'
    );
    const userId = 'sample-user-id';
    const pageId = 'sample-page-id';
    await sut.execute({ userId, pageId });

    expect(getPageByIdRepositorySpy).toHaveBeenCalledWith(pageId);
  });

  it('should return PageNotFoundError if page is not found', async () => {
    const { sut, getPageByIdRepositoryStub } = makesSut();

    jest
      .spyOn(getPageByIdRepositoryStub, 'getPageById')
      .mockImplementation(async () => {
        return null;
      });

    const userId = 'sample-user-id';
    const pageId = 'sample-page-id';
    const response = await sut.execute({ userId, pageId });

    expect(response).toEqual(new PageNotFoundError());
  });

  it('should return ForbiddenError if page is not found', async () => {
    const { sut, getWorkspaceByUserIdRepositoryStub } = makesSut();

    jest
      .spyOn(getWorkspaceByUserIdRepositoryStub, 'getWorkspacesByUserId')
      .mockImplementation(async () => {
        return [];
      });

    const userId = 'sample-user-id';
    const pageId = 'sample-page-id';
    const response = await sut.execute({ userId, pageId });

    expect(response).toEqual(new ForbiddenError());
  });
});
