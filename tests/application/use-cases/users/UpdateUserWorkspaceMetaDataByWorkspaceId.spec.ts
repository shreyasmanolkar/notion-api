import { UpdateUserWorkspaceMetaDataByWorkspaceId } from '@application/use-cases/users/UpdateUserWorkspaceMetaDataByWorkspaceId';
import mockUser from '@tests/domain/mock-user';
import {
  GetUserByIdRepositoryStub,
  UpdateUserWorkspaceMetaDataByWorkspaceIdRepositoryStub,
} from '@tests/infrastructure/mocks/users/repositories';

type SutTypes = {
  sut: UpdateUserWorkspaceMetaDataByWorkspaceId;
  getUserByIdRepositoryStub: GetUserByIdRepositoryStub;
  updateUserWorkspaceMetaDataByWorkspaceIdRepositoryStub: UpdateUserWorkspaceMetaDataByWorkspaceIdRepositoryStub;
};

const makeSut = (): SutTypes => {
  const updateUserWorkspaceMetaDataByWorkspaceIdRepositoryStub =
    new UpdateUserWorkspaceMetaDataByWorkspaceIdRepositoryStub();

  const getUserByIdRepositoryStub = new GetUserByIdRepositoryStub();

  const sut = new UpdateUserWorkspaceMetaDataByWorkspaceId(
    getUserByIdRepositoryStub,
    updateUserWorkspaceMetaDataByWorkspaceIdRepositoryStub
  );

  return {
    sut,
    getUserByIdRepositoryStub,
    updateUserWorkspaceMetaDataByWorkspaceIdRepositoryStub,
  };
};

describe('UpdateUserWorkspaceMetaDataByWorkspaceId', () => {
  it('should call UpdateUserWorkspaceMetaDataByWorkspaceIdRepository with correct params', async () => {
    const { sut, updateUserWorkspaceMetaDataByWorkspaceIdRepositoryStub } =
      makeSut();
    const updateUserWorkspaceMetaDataByWorkspaceIdRepositorySpy = jest.spyOn(
      updateUserWorkspaceMetaDataByWorkspaceIdRepositoryStub,
      'updateUserWorkspaceMetaDataByWorkspaceId'
    );
    const { workspaces, id } = mockUser();
    const { workspaceId } = workspaces[0];
    const workspaceData = {
      workspaceName: 'sample-workspace',
    };

    await sut.execute({
      userId: id,
      workspaceId,
      workspaceData,
    });
    expect(
      updateUserWorkspaceMetaDataByWorkspaceIdRepositorySpy
    ).toHaveBeenCalledWith({
      userId: id,
      workspaceId,
      workspaceData,
    });
  });
});
