import { UserNotFoundError } from '@application/errors/UserNotFoundError';
import { UpdateUserProfilePictureController } from '@infrastructure/http/controllers/users/UpdateUserProfilePictureController';
import { notFound } from '@infrastructure/http/helpers/http';
import { HttpRequest } from '@infrastructure/http/interfaces/HttpRequest';
import {
  GetUserByIdStub,
  UpdateUserProfilePictureStub,
} from '@tests/application/mocks/users/use-cases';
import mockUser from '@tests/domain/mock-user';
import { ValidationStub } from '@tests/infrastructure/mocks/validators';

type SutTypes = {
  sut: UpdateUserProfilePictureController;
  validationStub: ValidationStub;
  getUserByIdStub: GetUserByIdStub;
  updateUserProfilePictureStub: UpdateUserProfilePictureStub;
};

const makeSut = (): SutTypes => {
  const validationStub = new ValidationStub();
  const getUserByIdStub = new GetUserByIdStub();
  const updateUserProfilePictureStub = new UpdateUserProfilePictureStub();
  const sut = new UpdateUserProfilePictureController(
    validationStub,
    getUserByIdStub,
    updateUserProfilePictureStub
  );
  return {
    sut,
    getUserByIdStub,
    updateUserProfilePictureStub,
    validationStub,
  };
};

const makeFakeHttpRequest = (): HttpRequest => {
  const { profilePicture, id } = mockUser();
  const { url } = profilePicture;
  return {
    params: {
      userId: id,
    },
    body: { url },
  };
};

describe('UpdateUserProfilePictureConroller', () => {
  it('should call UpdateUserProfilePictureConroller with correct params', async () => {
    const { sut, updateUserProfilePictureStub } = makeSut();
    const updateUserProfilePictureSpy = jest.spyOn(
      updateUserProfilePictureStub,
      'execute'
    );
    const httpRequest = makeFakeHttpRequest();
    await sut.handle(httpRequest);

    expect(updateUserProfilePictureSpy).toHaveBeenCalledWith({
      userId: httpRequest.params.userId,
      url: httpRequest.body.url,
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

  it('should return 200 on success', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(makeFakeHttpRequest());

    expect(httpResponse.statusCode).toBe(204);
  });
});
