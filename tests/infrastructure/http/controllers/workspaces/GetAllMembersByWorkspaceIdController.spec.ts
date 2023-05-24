import { WorkspaceNotFoundError } from '@application/errors/WorkspaceNotFoundError';
import { GetAllMembersByWorkspaceIdController } from '@infrastructure/http//controllers/workspaces/GetAllMembersByWorkspaceIdController';
import { notFound } from '@infrastructure/http/helpers/http';
import { HttpRequest } from '@infrastructure/http/interfaces/HttpRequest';
import {
  GetAllMembersByWorkspaceIdStub,
  GetWorkspaceByIdStub,
} from '@tests/application/mocks/workspaces/use-cases';
import mockWorkspace from '@tests/domain/mock-workspace';

type SutTypes = {
  sut: GetAllMembersByWorkspaceIdController;
  getWorkspaceByIdStub: GetWorkspaceByIdStub;
  getAllMembersByWorkspaceIdStub: GetAllMembersByWorkspaceIdStub;
};

const makeSut = (): SutTypes => {
  const getWorkspaceByIdStub = new GetWorkspaceByIdStub();
  const getAllMembersByWorkspaceIdStub = new GetAllMembersByWorkspaceIdStub();
  const sut = new GetAllMembersByWorkspaceIdController(
    getWorkspaceByIdStub,
    getAllMembersByWorkspaceIdStub
  );

  return {
    getWorkspaceByIdStub,
    getAllMembersByWorkspaceIdStub,
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

describe('GetAllMembersByWorkspaceIdController', () => {
  it('should call getAllMembersByWorkspaceId with correct params', async () => {
    const { sut, getAllMembersByWorkspaceIdStub } = makeSut();

    const getAllMembersByWorkspaceIdSpy = jest.spyOn(
      getAllMembersByWorkspaceIdStub,
      'execute'
    );

    const httpRequest = makeFakeHttpRequest();
    await sut.handle(httpRequest);

    expect(getAllMembersByWorkspaceIdSpy).toHaveBeenCalledWith(
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
