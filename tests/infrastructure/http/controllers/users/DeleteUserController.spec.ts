import { DeleteUserStub } from '@tests/application/mocks/users/use-cases';
import { DeleteUserController } from '@infrastructure/http/controllers/users/DeleteUserController';
import { HttpRequest } from '@infrastructure/http/interfaces/HttpRequest';
import mockUser from '@tests/domain/mock-user';

type SutTypes = {
  sut: DeleteUserController;
  deleteUserStub: DeleteUserStub;
};

const makeSut = (): SutTypes => {
  const deleteUserStub = new DeleteUserStub();
  const sut = new DeleteUserController(deleteUserStub);

  return {
    sut,
    deleteUserStub,
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

describe('DeleteUserController', () => {
  it('should call deleteUser with correct id', async () => {
    const { sut, deleteUserStub } = makeSut();

    const deleteUserSpy = jest.spyOn(deleteUserStub, 'execute');
    const httpRequest = makeFakeHttpRequest();
    await sut.handle(httpRequest);

    expect(deleteUserSpy).toHaveBeenCalledWith(httpRequest.params.userId);
  });

  it('should return 204 on success', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(makeFakeHttpRequest());

    expect(httpResponse.statusCode).toBe(204);
  });
});
