import { RemovePageIdFromFavoritesByWorkspaceIdController } from '@infrastructure/http/controllers/users/RemovePageIdFromFavoritesByWorkspaceIdController';
import { PermissionError } from '@infrastructure/http/errors/PermissionError';
import { forbidden } from '@infrastructure/http/helpers/http';
import { HttpRequest } from '@infrastructure/http/interfaces/HttpRequest';
import {
  GetWorkspacesByUserIdStub,
  RemovePageIdFromFavoritesByWorkspaceIdStub,
} from '@tests/application/mocks/users/use-cases';
import mockUser from '@tests/domain/mock-user';

type SutTypes = {
  sut: RemovePageIdFromFavoritesByWorkspaceIdController;
  getWorkspacesByUserIdStub: GetWorkspacesByUserIdStub;
  removePageIdFromFavoritesByWorkspaceIdStub: RemovePageIdFromFavoritesByWorkspaceIdStub;
};

const makeSut = (): SutTypes => {
  const getWorkspacesByUserIdStub = new GetWorkspacesByUserIdStub();
  const removePageIdFromFavoritesByWorkspaceIdStub =
    new RemovePageIdFromFavoritesByWorkspaceIdStub();
  const sut = new RemovePageIdFromFavoritesByWorkspaceIdController(
    getWorkspacesByUserIdStub,
    removePageIdFromFavoritesByWorkspaceIdStub
  );
  return {
    getWorkspacesByUserIdStub,
    removePageIdFromFavoritesByWorkspaceIdStub,
    sut,
  };
};

const makeFakeHttpRequest = (): HttpRequest => {
  const { id } = mockUser();
  return {
    params: {
      userId: id,
      workspaceId: '112233445566778899bbccaa',
      pageId: 'sample-page-1',
    },
  };
};

describe('RemovePageIdFromFavoritesByWorkspaceIdController', () => {
  it('should call RemovePageIdFromFavoritesByWorkspaceId with correct params', async () => {
    const { sut, removePageIdFromFavoritesByWorkspaceIdStub } = makeSut();

    const removePageIdFromFavoritesByWorkspaceIdSpy = jest.spyOn(
      removePageIdFromFavoritesByWorkspaceIdStub,
      'execute'
    );

    const httpRequest = makeFakeHttpRequest();
    await sut.handle(httpRequest);

    expect(removePageIdFromFavoritesByWorkspaceIdSpy).toHaveBeenCalledWith({
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

    expect(httpResponse.statusCode).toBe(204);
  });
});
