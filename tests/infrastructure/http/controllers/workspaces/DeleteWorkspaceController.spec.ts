import { WorkspaceNotFoundError } from '@application/errors/WorkspaceNotFoundError';
import { DeleteWorkspaceController } from '@infrastructure/http/controllers/workspaces/DeleteWorkspaceController';
import { notFound } from '@infrastructure/http/helpers/http';
import { HttpRequest } from '@infrastructure/http/interfaces/HttpRequest';
import {
  DeleteWorkspaceStub,
  GetWorkspaceByIdStub,
} from '@tests/application/mocks/workspaces/use-cases';
import mockWorkspace from '@tests/domain/mock-workspace';

type SutTypes = {
  sut: DeleteWorkspaceController;
  getWorkspaceByIdStub: GetWorkspaceByIdStub;
  deleteWorkspaceStub: DeleteWorkspaceStub;
};

const makeSut = (): SutTypes => {
  const getWorkspaceByIdStub = new GetWorkspaceByIdStub();
  const deleteWorkspaceStub = new DeleteWorkspaceStub();
  const sut = new DeleteWorkspaceController(
    getWorkspaceByIdStub,
    deleteWorkspaceStub
  );

  return {
    sut,
    getWorkspaceByIdStub,
    deleteWorkspaceStub,
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
  it('should call deleteUser with correct id', async () => {
    const { sut, deleteWorkspaceStub } = makeSut();

    const deleteWorkspaceSpy = jest.spyOn(deleteWorkspaceStub, 'execute');
    const httpRequest = makeFakeHttpRequest();
    await sut.handle(httpRequest);

    expect(deleteWorkspaceSpy).toHaveBeenCalledWith(
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
