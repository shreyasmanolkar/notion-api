import { GetWorkspacesByUserId } from '@application/use-cases/users/GetWorkspacesByUserId';
import mockUser from '@tests/domain/mock-user';
import { GetWorkspacesByUserIdRepositoryStub } from '@tests/infrastructure/mocks/users/repositories';

type SutTypes = {
  sut: GetWorkspacesByUserId;
  getWorkspacesByUserIdRepositoryStub: GetWorkspacesByUserIdRepositoryStub;
};

const makeSut = (): SutTypes => {
  const getWorkspacesByUserIdRepositoryStub =
    new GetWorkspacesByUserIdRepositoryStub();
  const sut = new GetWorkspacesByUserId(getWorkspacesByUserIdRepositoryStub);
  return {
    sut,
    getWorkspacesByUserIdRepositoryStub,
  };
};

describe('GetUserById', () => {
  it('should call GetUserByIdRepository with correct post id', async () => {
    const { sut, getWorkspacesByUserIdRepositoryStub } = makeSut();
    const getUserByIdRepositorySpy = jest.spyOn(
      getWorkspacesByUserIdRepositoryStub,
      'getWorkspacesByUserId'
    );
    const { id } = mockUser();
    await sut.execute(id);
    expect(getUserByIdRepositorySpy).toHaveBeenCalledWith(id);
  });

  it('should return a workspaces on success', async () => {
    const { sut } = makeSut();
    const user = mockUser();
    const response = await sut.execute(user.id);
    expect(response).toEqual(user.workspaces);
  });
});
