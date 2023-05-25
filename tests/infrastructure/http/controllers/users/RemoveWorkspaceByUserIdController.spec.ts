import { RemoveWorkspaceByUserIdController } from '@infrastructure/http/controllers/users/RemoveWorkspaceByUserIdController';
import { PermissionError } from '@infrastructure/http/errors/PermissionError';
import { forbidden } from '@infrastructure/http/helpers/http';
import { HttpRequest } from '@infrastructure/http/interfaces/HttpRequest';
import {
  GetWorkspacesByUserIdStub,
  RemoveWorkspaceByUserIdStub,
} from '@tests/application/mocks/users/use-cases';
import mockUser from '@tests/domain/mock-user';

type SutTypes = {
  sut: RemoveWorkspaceByUserIdController;
  getWorkspacesByUserIdStub: GetWorkspacesByUserIdStub;
  removeWorkspaceByUserIdStub: RemoveWorkspaceByUserIdStub;
};

const makeSut = (): SutTypes => {
  const getWorkspacesByUserIdStub = new GetWorkspacesByUserIdStub();
  const removeWorkspaceByUserIdStub = new RemoveWorkspaceByUserIdStub();
  const sut = new RemoveWorkspaceByUserIdController(
    getWorkspacesByUserIdStub,
    removeWorkspaceByUserIdStub
  );

  return {
    getWorkspacesByUserIdStub,
    removeWorkspaceByUserIdStub,
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

describe('RemoveWorkspaceByUserIdController', () => {
  it('should call removeWorkspaceByUserId with correct params', async () => {
    const { sut, removeWorkspaceByUserIdStub } = makeSut();

    const addWorkspaceByUserIdSpy = jest.spyOn(
      removeWorkspaceByUserIdStub,
      'execute'
    );

    const httpRequest = makeFakeHttpRequest();

    await sut.handle(httpRequest);

    expect(addWorkspaceByUserIdSpy).toHaveBeenCalledWith({
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
