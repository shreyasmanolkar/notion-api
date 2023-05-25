import { WorkspaceNotFoundError } from '@application/errors/WorkspaceNotFoundError';
import { RemovePageByPageIdController } from '@infrastructure/http/controllers/workspaces/RemovePageByPageIdController';
import { notFound } from '@infrastructure/http/helpers/http';
import { HttpRequest } from '@infrastructure/http/interfaces/HttpRequest';
import {
  GetWorkspaceByIdStub,
  RemovePageByPageIdStub,
} from '@tests/application/mocks/workspaces/use-cases';
import mockWorkspace from '@tests/domain/mock-workspace';

type SutTypes = {
  sut: RemovePageByPageIdController;
  getWorkspaceByIdStub: GetWorkspaceByIdStub;
  removePageByPageIdStub: RemovePageByPageIdStub;
};

const makeSut = (): SutTypes => {
  const getWorkspaceByIdStub = new GetWorkspaceByIdStub();
  const removePageByPageIdStub = new RemovePageByPageIdStub();
  const sut = new RemovePageByPageIdController(
    getWorkspaceByIdStub,
    removePageByPageIdStub
  );
  return {
    getWorkspaceByIdStub,
    removePageByPageIdStub,
    sut,
  };
};

const makeFakeHttpRequest = (): HttpRequest => {
  const { id } = mockWorkspace();
  return {
    params: {
      workspaceId: id,
      pageId: 'sample-page-id-1',
    },
  };
};

describe('RemovePageByPageIdController', () => {
  it('should call removePageByPageIdController with correct params', async () => {
    const { sut, removePageByPageIdStub } = makeSut();

    const removePageByPageIdSpy = jest.spyOn(removePageByPageIdStub, 'execute');

    const httpRequest = makeFakeHttpRequest();
    await sut.handle(httpRequest);

    expect(removePageByPageIdSpy).toHaveBeenCalledWith({
      ...httpRequest.params,
    });
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

    expect(httpResponse.statusCode).toBe(204);
  });
});
