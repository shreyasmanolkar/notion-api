import { UserNotFoundError } from '@application/errors/UserNotFoundError';
import { AddWorkspaceByUserIdController } from '@infrastructure/http/controllers/users/AddWorkspaceByUserIdController';
import { notFound } from '@infrastructure/http/helpers/http';
import { HttpRequest } from '@infrastructure/http/interfaces/HttpRequest';
import {
  AddWorkspaceByUserIdStub,
  GetUserByIdStub,
} from '@tests/application/mocks/users/use-cases';
import mockUser from '@tests/domain/mock-user';

type SutTypes = {
  sut: AddWorkspaceByUserIdController;
  getUserByIdStub: GetUserByIdStub;
  addWorkspaceByUserIdStub: AddWorkspaceByUserIdStub;
};

const makeSut = (): SutTypes => {
  const getUserByIdStub = new GetUserByIdStub();
  const addWorkspaceByUserIdStub = new AddWorkspaceByUserIdStub();
  const sut = new AddWorkspaceByUserIdController(
    getUserByIdStub,
    addWorkspaceByUserIdStub
  );

  return {
    getUserByIdStub,
    addWorkspaceByUserIdStub,
    sut,
  };
};

const makeFakeHttpRequest = (): HttpRequest => {
  const { id } = mockUser();
  return {
    params: {
      userId: id,
      workspaceId: 'sample-workspace-id-2',
    },
    body: {
      workspaceName: 'sample-workspace',
      workspaceIcon: '1f30e',
    },
  };
};

describe('AddWorkspaceByUserIdController', () => {
  it('should call addWorkspaceByUserId with correct params', async () => {
    const { sut, addWorkspaceByUserIdStub } = makeSut();

    const addWorkspaceByUserIdSpy = jest.spyOn(
      addWorkspaceByUserIdStub,
      'execute'
    );

    const httpRequest = makeFakeHttpRequest();

    await sut.handle(httpRequest);

    expect(addWorkspaceByUserIdSpy).toHaveBeenCalledWith({
      ...httpRequest.params,
      ...httpRequest.body,
    });
  });

  it('should return 404 if user is not found', async () => {
    const { sut, getUserByIdStub } = makeSut();

    jest.spyOn(getUserByIdStub, 'execute').mockImplementation(async () => {
      return new UserNotFoundError();
    });

    const httpResponse = await sut.handle(makeFakeHttpRequest());

    expect(httpResponse).toEqual(notFound(new UserNotFoundError()));
  });

  it('should return 204 on success', async () => {
    const { sut } = makeSut();
    const httpRequest = makeFakeHttpRequest();
    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(204);
  });
});
