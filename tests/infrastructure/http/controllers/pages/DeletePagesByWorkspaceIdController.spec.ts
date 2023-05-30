import { WorkspaceNotFoundError } from '@application/errors/WorkspaceNotFoundError';
import { DeletePagesByWorkspaceIdController } from '@infrastructure/http/controllers/pages/DeletePagesByWorkspaceIdController';
import { notFound } from '@infrastructure/http/helpers/http';
import { HttpRequest } from '@infrastructure/http/interfaces/HttpRequest';
import { DeletePagesByWorkspaceIdStub } from '@tests/application/mocks/pages/use-cases';
import { GetWorkspaceByIdStub } from '@tests/application/mocks/workspaces/use-cases';
import mockPage from '@tests/domain/mock-page';

type SutTypes = {
  sut: DeletePagesByWorkspaceIdController;
  getWorkspaceByIdStub: GetWorkspaceByIdStub;
  deletePagesByWorkspaceIdStub: DeletePagesByWorkspaceIdStub;
};

const makeSut = (): SutTypes => {
  const getWorkspaceByIdStub = new GetWorkspaceByIdStub();
  const deletePagesByWorkspaceIdStub = new DeletePagesByWorkspaceIdStub();
  const sut = new DeletePagesByWorkspaceIdController(
    getWorkspaceByIdStub,
    deletePagesByWorkspaceIdStub
  );

  return {
    sut,
    getWorkspaceByIdStub,
    deletePagesByWorkspaceIdStub,
  };
};

const makeFakeHttpRequest = (): HttpRequest => {
  const { workspaceId } = mockPage();
  return {
    params: {
      workspaceId,
    },
  };
};

describe('DeletePagesByWorkspaceIdController', () => {
  it('should call DeletePagesByWorkspaceId with correct id', async () => {
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
