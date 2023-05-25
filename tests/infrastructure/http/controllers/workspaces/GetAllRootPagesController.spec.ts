import { WorkspaceNotFoundError } from '@application/errors/WorkspaceNotFoundError';
import { GetAllRootPagesController } from '@infrastructure/http/controllers/workspaces/GetAllRootPagesController';
import { notFound } from '@infrastructure/http/helpers/http';
import { HttpRequest } from '@infrastructure/http/interfaces/HttpRequest';
import {
  GetAllRootPagesStub,
  GetWorkspaceByIdStub,
} from '@tests/application/mocks/workspaces/use-cases';
import mockWorkspace from '@tests/domain/mock-workspace';

type SutTypes = {
  sut: GetAllRootPagesController;
  getWorkspaceByIdStub: GetWorkspaceByIdStub;
  getAllRootPagesStub: GetAllRootPagesStub;
};

const makeSut = (): SutTypes => {
  const getWorkspaceByIdStub = new GetWorkspaceByIdStub();
  const getAllRootPagesStub = new GetAllRootPagesStub();
  const sut = new GetAllRootPagesController(
    getWorkspaceByIdStub,
    getAllRootPagesStub
  );

  return {
    getWorkspaceByIdStub,
    getAllRootPagesStub,
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

describe('GetAllRootPagesController', () => {
  it('should call getAllRootPagesStub with correct params', async () => {
    const { sut, getAllRootPagesStub } = makeSut();

    const getAllRootPagesSpy = jest.spyOn(getAllRootPagesStub, 'execute');

    const httpRequest = makeFakeHttpRequest();
    await sut.handle(httpRequest);

    expect(getAllRootPagesSpy).toHaveBeenCalledWith(
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
