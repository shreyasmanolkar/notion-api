import { WorkspaceNotFoundError } from '@application/errors/WorkspaceNotFoundError';
import { DeleteWorkspaceController } from '@infrastructure/http/controllers/workspaces/DeleteWorkspaceController';
import { notFound } from '@infrastructure/http/helpers/http';
import { HttpRequest } from '@infrastructure/http/interfaces/HttpRequest';
import { DeletePagesByWorkspaceIdStub } from '@tests/application/mocks/pages/use-cases';
import { RemoveWorkspaceByUserIdStub } from '@tests/application/mocks/users/use-cases';
import {
  DeleteWorkspaceStub,
  GetAllMembersByWorkspaceIdStub,
  GetWorkspaceByIdStub,
} from '@tests/application/mocks/workspaces/use-cases';
import mockWorkspace from '@tests/domain/mock-workspace';

type SutTypes = {
  sut: DeleteWorkspaceController;
  getWorkspaceByIdStub: GetWorkspaceByIdStub;
  deletePagesByWorkspaceIdStub: DeletePagesByWorkspaceIdStub;
  deleteWorkspaceStub: DeleteWorkspaceStub;
  getAllMembersByWorkspaceIdStub: GetAllMembersByWorkspaceIdStub;
  removeWorkspaceByUserIdStub: RemoveWorkspaceByUserIdStub;
};

const makeSut = (): SutTypes => {
  const getWorkspaceByIdStub = new GetWorkspaceByIdStub();
  const deletePagesByWorkspaceIdStub = new DeletePagesByWorkspaceIdStub();
  const deleteWorkspaceStub = new DeleteWorkspaceStub();
  const getAllMembersByWorkspaceIdStub = new GetAllMembersByWorkspaceIdStub();
  const removeWorkspaceByUserIdStub = new RemoveWorkspaceByUserIdStub();

  const sut = new DeleteWorkspaceController(
    getWorkspaceByIdStub,
    deletePagesByWorkspaceIdStub,
    deleteWorkspaceStub,
    getAllMembersByWorkspaceIdStub,
    removeWorkspaceByUserIdStub
  );

  return {
    sut,
    getWorkspaceByIdStub,
    deletePagesByWorkspaceIdStub,
    deleteWorkspaceStub,
    getAllMembersByWorkspaceIdStub,
    removeWorkspaceByUserIdStub,
  };
};

const makeFakeHttpRequest = (): HttpRequest => {
  const { id } = mockWorkspace();
  return {
    params: {
      workspaceId: id,
    },
  };
};

describe('DeleteWorkspaceController', () => {
  it('should call deleteWorkspace with correct id', async () => {
    const { sut, deleteWorkspaceStub } = makeSut();

    const deleteWorkspaceSpy = jest.spyOn(deleteWorkspaceStub, 'execute');
    const httpRequest = makeFakeHttpRequest();
    await sut.handle(httpRequest);

    expect(deleteWorkspaceSpy).toHaveBeenCalledWith(
      httpRequest.params.workspaceId
    );
  });

  it('should call deletePagesByWorkspaceId with correct id', async () => {
    const { sut, deletePagesByWorkspaceIdStub } = makeSut();

    const deletePagesByWorkspaceIdSpy = jest.spyOn(
      deletePagesByWorkspaceIdStub,
      'execute'
    );
    const httpRequest = makeFakeHttpRequest();
    await sut.handle(httpRequest);

    expect(deletePagesByWorkspaceIdSpy).toHaveBeenCalledWith(
      httpRequest.params.workspaceId
    );
  });

  it('should return 404 if workspace is not found', async () => {
    const { sut, getWorkspaceByIdStub } = makeSut();
    const httpRequest = makeFakeHttpRequest();

    jest.spyOn(getWorkspaceByIdStub, 'execute').mockImplementation(async () => {
      return new WorkspaceNotFoundError();
    });

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse).toEqual(notFound(new WorkspaceNotFoundError()));
  });

  it('should return 204 on success', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(makeFakeHttpRequest());

    expect(httpResponse.statusCode).toBe(204);
  });
});
