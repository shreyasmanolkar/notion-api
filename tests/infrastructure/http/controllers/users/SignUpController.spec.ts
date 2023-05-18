import { EmailInUseError } from '@application/errors/EmailInUseError';
import { UnauthorizedError } from '@application/errors/UnauthorizedError';
import { SignUpController } from '@infrastructure/http/controllers/users/SignUpController';
import { forbidden, ok, unauthorized } from '@infrastructure/http/helpers/http';
import { HttpRequest } from '@infrastructure/http/interfaces/HttpRequest';
import {
  SignInStub,
  SignUpStub,
} from '@tests/application/mocks/users/use-cases';
import mockUser from '@tests/domain/mock-user';
import { ValidationStub } from '@tests/infrastructure/mocks/validators';

type SutTypes = {
  sut: SignUpController;
  validationStub: ValidationStub;
  signInStub: SignInStub;
  signUpStub: SignUpStub;
};

const makeSut = (): SutTypes => {
  const validationStub = new ValidationStub();
  const signInStub = new SignInStub();
  const signUpStub = new SignUpStub();
  const sut = new SignUpController(validationStub, signUpStub, signInStub);

  return {
    validationStub,
    signInStub,
    signUpStub,
    sut,
  };
};

const makeFakeHttpRequest = (): HttpRequest => {
  const { email, password, name, isDarkMode, profilePicture } = mockUser();

  return {
    body: {
      name,
      email,
      password,
      isDarkMode,
      profilePicture,
    },
  };
};

describe('SignUpController', () => {
  it('should call SignUp with given params', async () => {
    const { sut, signUpStub } = makeSut();

    const signUpSpy = jest.spyOn(signUpStub, 'execute');
    const httpRequest = makeFakeHttpRequest();
    await sut.handle(httpRequest);

    expect(signUpSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        ...httpRequest.body,
      })
    );
  });

  it('should return 403 if email is in use', async () => {
    const { sut, signUpStub } = makeSut();

    jest.spyOn(signUpStub, 'execute').mockImplementation(async () => {
      return new EmailInUseError();
    });

    const httpResponse = await sut.handle(makeFakeHttpRequest());

    expect(httpResponse).toEqual(forbidden(new EmailInUseError()));
  });

  it('should return 403 if authentication fails', async () => {
    const { sut, signInStub } = makeSut();

    jest.spyOn(signInStub, 'execute').mockImplementation(async () => {
      return new UnauthorizedError();
    });

    const httpResponse = await sut.handle(makeFakeHttpRequest());

    expect(httpResponse).toEqual(unauthorized(new UnauthorizedError()));
  });

  it('should return 200 on success', async () => {
    const { sut } = makeSut();

    const httpResponse = await sut.handle(makeFakeHttpRequest());

    expect(httpResponse).toEqual(
      ok({ authenticationToken: 'sample-jwt-token' })
    );
  });
});
