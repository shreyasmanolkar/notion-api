import { UserNotFoundError } from '@application/errors/UserNotFoundError';
import { UpdateUserController } from '@infrastructure/http/controllers/users/UpdateUserController';
import { notFound, ok } from '@infrastructure/http/helpers/http';
import { HttpRequest } from '@infrastructure/http/interfaces/HttpRequest';
import {
  GetUserByIdStub,
  UpdateUserStub,
} from '@tests/application/mocks/users/use-cases';
import mockUser from '@tests/domain/mock-user';
import { ValidationStub } from '@tests/infrastructure/mocks/validators';

type SutTypes = {
  sut: UpdateUserController;
  validationStub: ValidationStub;
  getUserByIdStub: GetUserByIdStub;
  updateUserStub: UpdateUserStub;
};

const makeSut = (): SutTypes => {
  const validationStub = new ValidationStub();
  const getUserByIdStub = new GetUserByIdStub();
  const updateUserStub = new UpdateUserStub();
  const sut = new UpdateUserController(
    validationStub,
    getUserByIdStub,
    updateUserStub
  );
  return {
    sut,
    getUserByIdStub,
    updateUserStub,
    validationStub,
  };
};

const makeFakeHttpRequest = (): HttpRequest => {
  const { name, email, password, isDarkMode, id } = mockUser();
  return {
    params: {
      userId: id,
    },
    body: {
      name,
      email,
      password,
      isDarkMode,
    },
  };
};

describe('UpdateUserController', () => {
  it('should call updateUser with correct params', async () => {
    const { sut, updateUserStub } = makeSut();
    const updateUserSpy = jest.spyOn(updateUserStub, 'execute');
    const httpRequest = makeFakeHttpRequest();
    await sut.handle(httpRequest);

    expect(updateUserSpy).toHaveBeenCalledWith({
      userId: httpRequest.params.userId,
      userData: httpRequest.body,
    });
  });

  it('should return 404 if GetUserById returns a UserNotFoundError', async () => {
    const { sut, getUserByIdStub } = makeSut();
    jest
      .spyOn(getUserByIdStub, 'execute')
      .mockImplementation(async () => new UserNotFoundError());
    const httpResponse = await sut.handle(makeFakeHttpRequest());
    expect(httpResponse).toEqual(notFound(new UserNotFoundError()));
  });

  it('should return 404 if UpdateUser returns a UserNotFoundError', async () => {
    const { sut, updateUserStub } = makeSut();
    jest
      .spyOn(updateUserStub, 'execute')
      .mockImplementation(async () => new UserNotFoundError());
    const httpResponse = await sut.handle(makeFakeHttpRequest());
    expect(httpResponse).toEqual(notFound(new UserNotFoundError()));
  });

  it('should return 200 on success', async () => {
    const { sut } = makeSut();
    const user = mockUser();
    const httpResponse = await sut.handle(makeFakeHttpRequest());
    expect(httpResponse).toEqual(ok(user));
  });
});
