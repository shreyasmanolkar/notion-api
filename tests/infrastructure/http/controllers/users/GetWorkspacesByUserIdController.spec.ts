import { GetWorkspacesByUserIdController } from '@infrastructure/http/controllers/users/GetWorkspacesByUserIdController';
import { HttpRequest } from '@infrastructure/http/interfaces/HttpRequest';
import { GetWorkspacesByUserIdStub } from '@tests/application/mocks/users/use-cases';
import mockUser from '@tests/domain/mock-user';

type SutTypes = {
  sut: GetWorkspacesByUserIdController;
  getWorkspacesByUserIdStub: GetWorkspacesByUserIdStub;
};

const makeSut = (): SutTypes => {
  const getWorkspacesByUserIdStub = new GetWorkspacesByUserIdStub();
  const sut = new GetWorkspacesByUserIdController(getWorkspacesByUserIdStub);

  return {
    getWorkspacesByUserIdStub,
    sut,
  };
};

const makeFakeHttpRequest = (): HttpRequest => {
  const { id } = mockUser();
  return {
    params: {
      userId: id,
    },
  };
};

describe('GetWorkspacesByUserIdController', () => {
  it('should call getWorkspacesByUserId with correct params', async () => {
    const { sut, getWorkspacesByUserIdStub } = makeSut();

    const getFavoritesByWorkspaceIdControllerSpy = jest.spyOn(
      getWorkspacesByUserIdStub,
      'execute'
    );

    const httpRequest = makeFakeHttpRequest();

    await sut.handle(httpRequest);

    expect(getFavoritesByWorkspaceIdControllerSpy).toHaveBeenCalledWith(
      httpRequest.params.userId
    );
  });

  it('should return 200 on success', async () => {
    const { sut } = makeSut();
    const httpRequest = makeFakeHttpRequest();
    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(200);
  });
});
