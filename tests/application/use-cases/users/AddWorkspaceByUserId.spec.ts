import { UserNotFoundError } from '@application/errors/UserNotFoundError';
import { AddWorkspaceByUserId } from '@application/use-cases/users/AddWorkspaceByUserId';
import mockUser from '@tests/domain/mock-user';
import {
  AddWorkspaceByUserIdRepositoryStub,
  GetUserByIdRepositoryStub,
} from '@tests/infrastructure/mocks/users/repositories';

type SutTypes = {
  sut: AddWorkspaceByUserId;
  getUserByIdRepositoryStub: GetUserByIdRepositoryStub;
  addWorkspaceByUserIdRepositoryStub: AddWorkspaceByUserIdRepositoryStub;
};

const makesSut = (): SutTypes => {
  const getUserByIdRepositoryStub = new GetUserByIdRepositoryStub();
  const addWorkspaceByUserIdRepositoryStub =
    new AddWorkspaceByUserIdRepositoryStub();
  const sut = new AddWorkspaceByUserId(
    getUserByIdRepositoryStub,
    addWorkspaceByUserIdRepositoryStub
  );

  return {
    sut,
    getUserByIdRepositoryStub,
    addWorkspaceByUserIdRepositoryStub,
  };
};

describe('AddWorkspaceByUserId', () => {
  it('should call AddWorkspaceByUserId with correct data', async () => {
    const { sut, addWorkspaceByUserIdRepositoryStub } = makesSut();
    const addWorkspaceByUserIdRepositorySpy = jest.spyOn(
      addWorkspaceByUserIdRepositoryStub,
      'addWorkspaceByUserId'
    );
    const { id, workspaces } = mockUser();
    const { workspaceId, workspaceName, workspaceIcon } = workspaces[0];
    await sut.execute({
      userId: id,
      workspaceId,
      workspaceName,
      workspaceIcon,
    });

    expect(addWorkspaceByUserIdRepositorySpy).toHaveBeenCalledWith({
      userId: id,
      workspaceId,
      workspaceName,
      workspaceIcon,
    });
  });

  it('should return user not found error if user is not found', async () => {
    const { sut, getUserByIdRepositoryStub } = makesSut();
    const { workspaces } = mockUser();
    const { workspaceId, workspaceName, workspaceIcon } = workspaces[0];

    jest
      .spyOn(getUserByIdRepositoryStub, 'getUserById')
      .mockReturnValueOnce(Promise.resolve(null));

    const response = await sut.execute({
      userId: 'other_user_id',
      workspaceId,
      workspaceName,
      workspaceIcon,
    });

    expect(response).toEqual(new UserNotFoundError());
  });
});
