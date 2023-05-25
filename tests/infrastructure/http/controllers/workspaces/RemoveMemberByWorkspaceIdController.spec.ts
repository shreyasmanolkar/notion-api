import { WorkspaceNotFoundError } from '@application/errors/WorkspaceNotFoundError';
import { RemoveMemberByWorkspaceIdController } from '@infrastructure/http/controllers/workspaces/RemoveMemberByWorkspaceIdController';
import { notFound } from '@infrastructure/http/helpers/http';
import { HttpRequest } from '@infrastructure/http/interfaces/HttpRequest';
import {
  GetWorkspaceByIdStub,
  RemoveMemberByWorkspaceIdStub,
} from '@tests/application/mocks/workspaces/use-cases';
import mockWorkspace from '@tests/domain/mock-workspace';

type SutTypes = {
  sut: RemoveMemberByWorkspaceIdController;
  getWorkspaceByIdStub: GetWorkspaceByIdStub;
  removeMemberByWorkspaceIdStub: RemoveMemberByWorkspaceIdStub;
};

const makeSut = (): SutTypes => {
  const getWorkspaceByIdStub = new GetWorkspaceByIdStub();
  const removeMemberByWorkspaceIdStub = new RemoveMemberByWorkspaceIdStub();
  const sut = new RemoveMemberByWorkspaceIdController(
    getWorkspaceByIdStub,
    removeMemberByWorkspaceIdStub
  );
  return {
    getWorkspaceByIdStub,
    removeMemberByWorkspaceIdStub,
    sut,
  };
};

const makeFakeHttpRequest = (): HttpRequest => {
  const { id } = mockWorkspace();
  return {
    params: {
      workspaceId: id,
      memberId: 'sample-member-id-1',
    },
  };
};

describe('RemoveMemberByWorkspaceIdController', () => {
  it('should call removeMemberByWorkspaceId with correct params', async () => {
    const { sut, removeMemberByWorkspaceIdStub } = makeSut();

    const removeMemberByWorkspaceIdSpy = jest.spyOn(
      removeMemberByWorkspaceIdStub,
      'execute'
    );

    const httpRequest = makeFakeHttpRequest();
    await sut.handle(httpRequest);

    expect(removeMemberByWorkspaceIdSpy).toHaveBeenCalledWith({
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
