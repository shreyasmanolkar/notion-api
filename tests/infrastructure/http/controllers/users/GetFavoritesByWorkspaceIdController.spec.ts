import { GetFavoritesByWorkspaceIdController } from '@infrastructure/http/controllers/users/GetFavoritesByWorkspaceIdController';
import { PermissionError } from '@infrastructure/http/errors/PermissionError';
import { forbidden } from '@infrastructure/http/helpers/http';
import { HttpRequest } from '@infrastructure/http/interfaces/HttpRequest';
import {
  GetFavoritesByWorkspaceIdStub,
  GetWorkspacesByUserIdStub,
} from '@tests/application/mocks/users/use-cases';
import mockUser from '@tests/domain/mock-user';

type SutTypes = {
  sut: GetFavoritesByWorkspaceIdController;
  getWorkspacesByUserIdStub: GetWorkspacesByUserIdStub;
  getFavoritesByWorkspaceIdStub: GetFavoritesByWorkspaceIdStub;
};

const makeSut = (): SutTypes => {
  const getWorkspacesByUserIdStub = new GetWorkspacesByUserIdStub();
  const getFavoritesByWorkspaceIdStub = new GetFavoritesByWorkspaceIdStub();
  const sut = new GetFavoritesByWorkspaceIdController(
    getWorkspacesByUserIdStub,
    getFavoritesByWorkspaceIdStub
  );

  return {
    getWorkspacesByUserIdStub,
    getFavoritesByWorkspaceIdStub,
    sut,
  };
};

const makeFakeHttpRequest = (): HttpRequest => {
  const { id } = mockUser();
  return {
    params: {
      userId: id,
      workspaceId: '112233445566778899bbccaa',
    },
  };
};

describe('GetFavoritesByWorkspaceIdController', () => {
  it('should call GetFavoritesByWorkspaceId with correct params', async () => {
    const { sut, getFavoritesByWorkspaceIdStub } = makeSut();

    const getFavoritesByWorkspaceIdControllerSpy = jest.spyOn(
      getFavoritesByWorkspaceIdStub,
      'execute'
    );

    const httpRequest = makeFakeHttpRequest();
    await sut.handle(httpRequest);

    expect(getFavoritesByWorkspaceIdControllerSpy).toHaveBeenCalledWith({
      ...httpRequest.params,
    });
  });

  it('should return 403 if workspace is not verified', async () => {
    const { sut } = makeSut();
    const httpRequest = makeFakeHttpRequest();
    const httpResponse = await sut.handle({
      params: { ...httpRequest.params, workspaceId: 'other_workspace_id' },
    });

    expect(httpResponse).toEqual(forbidden(new PermissionError()));
  });

  it('should return 200 on success', async () => {
    const { sut } = makeSut();
    const httpRequest = makeFakeHttpRequest();
    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(200);
  });
});
