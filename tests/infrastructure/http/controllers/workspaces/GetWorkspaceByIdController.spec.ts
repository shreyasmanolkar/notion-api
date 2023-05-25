import { WorkspaceNotFoundError } from '@application/errors/WorkspaceNotFoundError';
import { GetWorkspaceByIdController } from '@infrastructure/http/controllers/workspaces/GetWorkspaceByIdController';
import { notFound } from '@infrastructure/http/helpers/http';
import { HttpRequest } from '@infrastructure/http/interfaces/HttpRequest';
import { GetWorkspaceByIdStub } from '@tests/application/mocks/workspaces/use-cases';
import mockWorkspace from '@tests/domain/mock-workspace';

type SutTypes = {
  sut: GetWorkspaceByIdController;
  getWorkspaceByIdStub: GetWorkspaceByIdStub;
};

const makeSut = (): SutTypes => {
  const getWorkspaceByIdStub = new GetWorkspaceByIdStub();
  const sut = new GetWorkspaceByIdController(getWorkspaceByIdStub);

  return {
    getWorkspaceByIdStub,
    sut,
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

describe('GetWorkspaceByIdController', () => {
  it('should call getWorkspaceById with correct params', async () => {
    const { sut, getWorkspaceByIdStub } = makeSut();

    const getWorkspaceByIdSpy = jest.spyOn(getWorkspaceByIdStub, 'execute');

    const httpRequest = makeFakeHttpRequest();
    await sut.handle(httpRequest);

    expect(getWorkspaceByIdSpy).toHaveBeenCalledWith(
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

  it('should return 200 on success', async () => {
    const { sut } = makeSut();
    const httpRequest = makeFakeHttpRequest();
    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(200);
  });
});
