import {
  DeleteUserStub,
  GetWorkspacesByUserIdStub,
} from '@tests/application/mocks/users/use-cases';
import { DeleteUserController } from '@infrastructure/http/controllers/users/DeleteUserController';
import { HttpRequest } from '@infrastructure/http/interfaces/HttpRequest';
import mockUser from '@tests/domain/mock-user';
import {
  DeleteWorkspaceStub,
  GetAllMembersByWorkspaceIdStub,
  RemoveMemberByWorkspaceIdStub,
} from '@tests/application/mocks/workspaces/use-cases';
import { DeletePagesByWorkspaceIdStub } from '@tests/application/mocks/pages/use-cases';

type SutTypes = {
  sut: DeleteUserController;
  deleteUserStub: DeleteUserStub;
  getWorkspaceByUserIdStub: GetWorkspacesByUserIdStub;
  getAllMembersByWorkspaceIdStub: GetAllMembersByWorkspaceIdStub;
  removeMemberByWorkspaceIdStub: RemoveMemberByWorkspaceIdStub;
  deletePagesByWorkspaceIdStub: DeletePagesByWorkspaceIdStub;
  deleteWorkspaceStub: DeleteWorkspaceStub;
};

const makeSut = (): SutTypes => {
  const deleteUserStub = new DeleteUserStub();
  const getWorkspaceByUserIdStub = new GetWorkspacesByUserIdStub();
  const getAllMembersByWorkspaceIdStub = new GetAllMembersByWorkspaceIdStub();
  const removeMemberByWorkspaceIdStub = new RemoveMemberByWorkspaceIdStub();
  const deletePagesByWorkspaceIdStub = new DeletePagesByWorkspaceIdStub();
  const deleteWorkspaceStub = new DeleteWorkspaceStub();

  const sut = new DeleteUserController(
    deleteUserStub,
    getWorkspaceByUserIdStub,
    getAllMembersByWorkspaceIdStub,
    removeMemberByWorkspaceIdStub,
    deletePagesByWorkspaceIdStub,
    deleteWorkspaceStub
  );

  return {
    sut,
    deleteUserStub,
    getWorkspaceByUserIdStub,
    getAllMembersByWorkspaceIdStub,
    removeMemberByWorkspaceIdStub,
    deletePagesByWorkspaceIdStub,
    deleteWorkspaceStub,
  };
};

const makeFakeHttpRequest = (): HttpRequest => {
  const { id } = mockUser();
  return {
    params: {
      userId: id,
    },
  };
};

describe('DeleteUserController', () => {
  it('should call deleteUser with correct id', async () => {
    const { sut, deleteUserStub } = makeSut();

    const deleteUserSpy = jest.spyOn(deleteUserStub, 'execute');
    const httpRequest = makeFakeHttpRequest();
    await sut.handle(httpRequest);

    expect(deleteUserSpy).toHaveBeenCalledWith(httpRequest.params.userId);
  });

  it('should call getWorkspaceByUserId with given params', async () => {
    const { sut, getWorkspaceByUserIdStub } = makeSut();

    const getWorkspaceByUserIdSpy = jest.spyOn(
      getWorkspaceByUserIdStub,
      'execute'
    );
    const httpRequest = makeFakeHttpRequest();
    await sut.handle(httpRequest);

    expect(getWorkspaceByUserIdSpy).toHaveBeenCalledWith(
      httpRequest.params.userId
    );
  });

  it('should call getAllMembersByWorkspaceId with given params', async () => {
    const { sut, getAllMembersByWorkspaceIdStub } = makeSut();

    const getAllMembersByWorkspaceIdSpy = jest.spyOn(
      getAllMembersByWorkspaceIdStub,
      'execute'
    );
    const httpRequest = makeFakeHttpRequest();
    await sut.handle(httpRequest);

    expect(getAllMembersByWorkspaceIdSpy).toHaveBeenCalledWith(
      '112233445566778899bbccaa'
    );
  });

  it('should call deleteWorkspace with given params', async () => {
    const { sut, deleteWorkspaceStub } = makeSut();

    const deleteWorkspaceSpy = jest.spyOn(deleteWorkspaceStub, 'execute');
    const httpRequest = makeFakeHttpRequest();
    await sut.handle(httpRequest);

    expect(deleteWorkspaceSpy).toHaveBeenCalledWith('112233445566778899bbccaa');
  });

  it('should call deleteWorkspace with given params', async () => {
    const { sut, deletePagesByWorkspaceIdStub } = makeSut();

    const deletePagesByWorkspaceIdSpy = jest.spyOn(
      deletePagesByWorkspaceIdStub,
      'execute'
    );
    const httpRequest = makeFakeHttpRequest();
    await sut.handle(httpRequest);

    expect(deletePagesByWorkspaceIdSpy).toHaveBeenCalledWith(
      '112233445566778899bbccaa'
    );
  });

  it('should call removeMemberByWorkspaceId with given params', async () => {
    const {
      sut,
      removeMemberByWorkspaceIdStub,
      getAllMembersByWorkspaceIdStub,
    } = makeSut();

    jest
      .spyOn(getAllMembersByWorkspaceIdStub, 'execute')
      .mockImplementation(() => {
        return Promise.resolve(['112233445566778899bbccaa', 'sample-member-2']);
      });

    const removeMemberByWorkspaceIdSpy = jest.spyOn(
      removeMemberByWorkspaceIdStub,
      'execute'
    );
    const httpRequest = makeFakeHttpRequest();
    await sut.handle(httpRequest);

    expect(removeMemberByWorkspaceIdSpy).toHaveBeenCalledWith({
      workspaceId: '112233445566778899bbccaa',
      memberId: httpRequest.params.userId,
    });
  });

  it('should return 204 on success', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(makeFakeHttpRequest());

    expect(httpResponse.statusCode).toBe(204);
  });
});
