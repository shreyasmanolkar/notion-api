import { AddPageIdToFavoritesByWorkspaceIdController } from '@infrastructure/http/controllers/users/AddPageIdToFavoritesByWorkspaceIdController';
import { PermissionError } from '@infrastructure/http/errors/PermissionError';
import { forbidden } from '@infrastructure/http/helpers/http';
import { HttpRequest } from '@infrastructure/http/interfaces/HttpRequest';
import {
  AddPageIdToFavoritesByWorkspaceIdStub,
  GetWorkspacesByUserIdStub,
} from '@tests/application/mocks/users/use-cases';
import mockUser from '@tests/domain/mock-user';

type SutTypes = {
  sut: AddPageIdToFavoritesByWorkspaceIdController;
  getWorkspacesByUserIdStub: GetWorkspacesByUserIdStub;
  addPageIdToFavoritesByWorkspaceIdStub: AddPageIdToFavoritesByWorkspaceIdStub;
};

const makeSut = (): SutTypes => {
  const getWorkspacesByUserIdStub = new GetWorkspacesByUserIdStub();
  const addPageIdToFavoritesByWorkspaceIdStub =
    new AddPageIdToFavoritesByWorkspaceIdStub();
  const sut = new AddPageIdToFavoritesByWorkspaceIdController(
    getWorkspacesByUserIdStub,
    addPageIdToFavoritesByWorkspaceIdStub
  );
  return {
    getWorkspacesByUserIdStub,
    addPageIdToFavoritesByWorkspaceIdStub,
    sut,
  };
};

const makeFakeHttpRequest = (): HttpRequest => {
  const { id } = mockUser();
  return {
    params: {
      userId: id,
      workspaceId: '112233445566778899bbccaa',
      pageId: 'sample-page-2',
    },
  };
};

describe('AddPageIdToFavoritesByWorkspaceIdController', () => {
  it('should call AddPageIdToFavoritesByWorkspaceId with correct params', async () => {
    const { sut, addPageIdToFavoritesByWorkspaceIdStub } = makeSut();

    const addPageIdToFavoritesByWorkspaceIdSpy = jest.spyOn(
      addPageIdToFavoritesByWorkspaceIdStub,
      'execute'
    );

    const httpRequest = makeFakeHttpRequest();
    await sut.handle(httpRequest);

    expect(addPageIdToFavoritesByWorkspaceIdSpy).toHaveBeenCalledWith({
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

  it('should return 204 on success', async () => {
    const { sut } = makeSut();
    const httpRequest = makeFakeHttpRequest();
    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(204);
  });
});
