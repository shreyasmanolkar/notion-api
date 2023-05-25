import { WorkspaceNotFoundError } from '@application/errors/WorkspaceNotFoundError';
import { AddPageController } from '@infrastructure/http/controllers/workspaces/AddPageController';
import { notFound } from '@infrastructure/http/helpers/http';
import { HttpRequest } from '@infrastructure/http/interfaces/HttpRequest';
import {
  AddPageStub,
  GetWorkspaceByIdStub,
} from '@tests/application/mocks/workspaces/use-cases';
import mockWorkspace from '@tests/domain/mock-workspace';
import { ValidationStub } from '@tests/infrastructure/mocks/validators';

type SutTypes = {
  sut: AddPageController;
  validationStub: ValidationStub;
  getWorkspaceByIdStub: GetWorkspaceByIdStub;
  addPageStub: AddPageStub;
};

const makeSut = (): SutTypes => {
  const validationStub = new ValidationStub();
  const getWorkspaceByIdStub = new GetWorkspaceByIdStub();
  const addPageStub = new AddPageStub();
  const sut = new AddPageController(
    validationStub,
    getWorkspaceByIdStub,
    addPageStub
  );
  return {
    sut,
    validationStub,
    getWorkspaceByIdStub,
    addPageStub,
  };
};

const makeFakeHttpRequest = (): HttpRequest => {
  const { id } = mockWorkspace();
  return {
    params: {
      workspaceId: id,
    },
    body: {
      id: 'sample-page-id-01',
      reference: 'sample-page-0101',
      icon: 'smaple-hex',
      path: null,
    },
  };
};

describe('AddPageController', () => {
  it('should call addPage with correct params', async () => {
    const { sut, addPageStub } = makeSut();

    const addPageSpy = jest.spyOn(addPageStub, 'execute');

    const httpRequest = makeFakeHttpRequest();
    await sut.handle(httpRequest);

    expect(addPageSpy).toHaveBeenCalledWith({
      workspaceId: httpRequest.params.workspaceId,
      pageData: { ...httpRequest.body },
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

  it('should return 204 on success', async () => {
    const { sut } = makeSut();
    const httpRequest = makeFakeHttpRequest();
    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(204);
  });
});
