import { WorkspaceNotFoundError } from '@application/errors/WorkspaceNotFoundError';
import { AddMemberByWorkspaceIdController } from '@infrastructure/http/controllers/workspaces/AddMemberByWorkspaceIdController';
import { notFound } from '@infrastructure/http/helpers/http';
import { HttpRequest } from '@infrastructure/http/interfaces/HttpRequest';
import {
  AddMemberByWorkspaceIdStub,
  GetWorkspaceByIdStub,
} from '@tests/application/mocks/workspaces/use-cases';
import mockWorkspace from '@tests/domain/mock-workspace';

type SutTypes = {
  sut: AddMemberByWorkspaceIdController;
  getWorkspaceByIdStub: GetWorkspaceByIdStub;
  addMemberByWorkspaceIdStub: AddMemberByWorkspaceIdStub;
};

const makeSut = (): SutTypes => {
  const getWorkspaceByIdStub = new GetWorkspaceByIdStub();
  const addMemberByWorkspaceIdStub = new AddMemberByWorkspaceIdStub();
  const sut = new AddMemberByWorkspaceIdController(
    getWorkspaceByIdStub,
    addMemberByWorkspaceIdStub
  );
  return {
    getWorkspaceByIdStub,
    addMemberByWorkspaceIdStub,
    sut,
  };
};

const makeFakeHttpRequest = (): HttpRequest => {
  const { id } = mockWorkspace();
  return {
    params: {
      workspaceId: id,
      memberId: 'sample-member-id-2',
    },
  };
};

describe('AddMemberByWorkspaceIdController', () => {
  it('should call AddMemberByWorkspaceId with correct params', async () => {
    const { sut, addMemberByWorkspaceIdStub } = makeSut();

    const addMemberByWorkspaceIdSpy = jest.spyOn(
      addMemberByWorkspaceIdStub,
      'execute'
    );

    const httpRequest = makeFakeHttpRequest();
    await sut.handle(httpRequest);

    expect(addMemberByWorkspaceIdSpy).toHaveBeenCalledWith({
      ...httpRequest.params,
    });
  });

  it('should return 404 if workspace is not found', async () => {
    const { sut, getWorkspaceByIdStub } = makeSut();
    const httpRequest = makeFakeHttpRequest();

    jest.spyOn(getWorkspaceByIdStub, 'execute').mockImplementation(async () => {
      return new WorkspaceNotFoundError();
    });

    const httpResponse = await sut.handle({
      params: { ...httpRequest.params, workspaceId: 'other_workspace_id' },
    });

    expect(httpResponse).toEqual(notFound(new WorkspaceNotFoundError()));
  });

  it('should return 204 on success', async () => {
    const { sut } = makeSut();
    const httpRequest = makeFakeHttpRequest();
    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(204);
  });
});
