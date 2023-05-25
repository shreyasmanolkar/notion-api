import { WorkspaceNotFoundError } from '@application/errors/WorkspaceNotFoundError';
import { GetChildrensByPageReferenceController } from '@infrastructure/http/controllers/workspaces/GetChildrensByPageReferenceController';
import { notFound } from '@infrastructure/http/helpers/http';
import { HttpRequest } from '@infrastructure/http/interfaces/HttpRequest';
import { GetChildrensByPageReferenceStub } from '@tests/application/mocks/workspaces/use-cases';
import mockWorkspace from '@tests/domain/mock-workspace';

type SutTypes = {
  sut: GetChildrensByPageReferenceController;
  getChildrensByPageReferenceStub: GetChildrensByPageReferenceStub;
};

const makeSut = (): SutTypes => {
  const getChildrensByPageReferenceStub = new GetChildrensByPageReferenceStub();
  const sut = new GetChildrensByPageReferenceController(
    getChildrensByPageReferenceStub
  );

  return {
    sut,
    getChildrensByPageReferenceStub,
  };
};

const makeFakeHttpRequest = (): HttpRequest => {
  const { id } = mockWorkspace();
  return {
    params: {
      workspaceId: id,
      pageReference: 'sample-page-reference',
    },
  };
};

describe('GetChildrensByPageReferenceController', () => {
  it('should call getChildrensByPageReference with correct params', async () => {
    const { sut, getChildrensByPageReferenceStub } = makeSut();

    const getChildrensByPageReferenceSpy = jest.spyOn(
      getChildrensByPageReferenceStub,
      'execute'
    );

    const httpRequest = makeFakeHttpRequest();
    await sut.handle(httpRequest);

    expect(getChildrensByPageReferenceSpy).toHaveBeenCalledWith({
      ...httpRequest.params,
    });
  });

  it('should return 404 if workspace is not found', async () => {
    const { sut, getChildrensByPageReferenceStub } = makeSut();
    const httpRequest = makeFakeHttpRequest();

    jest
      .spyOn(getChildrensByPageReferenceStub, 'execute')
      .mockImplementation(async () => {
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
