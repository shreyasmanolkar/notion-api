import { InvalidPasswordError } from '@application/errors/InvalidPasswordError';
import { InvalidUserError } from '@application/errors/InvalidUserError';
import { SignInController } from '@infrastructure/http/controllers/users/SignInController';
import { ok, unauthorized } from '@infrastructure/http/helpers/http';
import { HttpRequest } from '@infrastructure/http/interfaces/HttpRequest';
import { SignInStub } from '@tests/application/mocks/users/use-cases';
import mockUser from '@tests/domain/mock-user';
import { ValidationStub } from '@tests/infrastructure/mocks/validators';

type SutTypes = {
  sut: SignInController;
  validationStub: ValidationStub;
  signInStub: SignInStub;
};

const makeSut = (): SutTypes => {
  const validationStub = new ValidationStub();
  const signInStub = new SignInStub();
  const sut = new SignInController(validationStub, signInStub);

  return {
    validationStub,
    signInStub,
    sut,
  };
};

const makeFakeHttpRequest = (): HttpRequest => {
  const { email, password } = mockUser();
  return {
    body: {
      email,
      password,
    },
  };
};

describe('SignInController', () => {
  it('should call SignIn with given params', async () => {
    const { sut, signInStub } = makeSut();

    const signInSpy = jest.spyOn(signInStub, 'execute');
    const httpRequest = makeFakeHttpRequest();
    await sut.handle(httpRequest);

    expect(signInSpy).toHaveBeenCalledWith({
      ...httpRequest.body,
    });
  });

  it('should return 403 if authentication fails', async () => {
    const { sut, signInStub } = makeSut();

    jest.spyOn(signInStub, 'execute').mockImplementation(async () => {
      return new InvalidUserError();
    });

    const httpResponse = await sut.handle(makeFakeHttpRequest());

    expect(httpResponse).toEqual(unauthorized(new InvalidUserError()));
  });

  it('should return 403 if authentication fails', async () => {
    const { sut, signInStub } = makeSut();

    jest.spyOn(signInStub, 'execute').mockImplementation(async () => {
      return new InvalidPasswordError();
    });

    const httpResponse = await sut.handle(makeFakeHttpRequest());

    expect(httpResponse).toEqual(unauthorized(new InvalidPasswordError()));
  });

  it('should return 200 on success', async () => {
    const { sut } = makeSut();

    const httpResponse = await sut.handle(makeFakeHttpRequest());

    const refreshCookie = {
      token: 'sample-refresh-token',
    };

    expect(httpResponse).toEqual(
      ok(
        {
          accessToken: 'sample-access-token',
        },
        refreshCookie
      )
    );
  });
});
