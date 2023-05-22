import { GetUserByIdStub } from '@tests/application/mocks/users/use-cases';
import { GetUserByIdController } from '@infrastructure/http/controllers/users/GetUserByIdController';
import { HttpRequest } from '@infrastructure/http/interfaces/HttpRequest';
import mockUser from '@tests/domain/mock-user';

type SutTypes = {
  sut: GetUserByIdController;
  getUserByIdStub: GetUserByIdStub;
};

const makeSut = (): SutTypes => {
  const getUserByIdStub = new GetUserByIdStub();
  const sut = new GetUserByIdController(getUserByIdStub);

  return {
    sut,
    getUserByIdStub,
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

describe('GetUserByIdController', () => {
  it('should call GetUserById with correct params', async () => {
    const { sut, getUserByIdStub } = makeSut();

    const getUserByIdSpy = jest.spyOn(getUserByIdStub, 'execute');

    const httpRequest = makeFakeHttpRequest();
    await sut.handle(httpRequest);

    expect(getUserByIdSpy).toHaveBeenCalledWith(httpRequest.params.userId);
  });

  it('should return 200 on success', async () => {
    const { sut } = makeSut();
    const httpRequest = makeFakeHttpRequest();
    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(200);
  });
});
