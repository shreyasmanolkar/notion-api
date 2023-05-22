import { SignOutController } from '@infrastructure/http/controllers/users/SignOutController';
import { ok } from '@infrastructure/http/helpers/http';
import { HttpRequest } from '@infrastructure/http/interfaces/HttpRequest';
import { SignOutStub } from '@tests/application/mocks/users/use-cases';

type SutTypes = {
  sut: SignOutController;
  signOutStub: SignOutStub;
};

const makeSut = (): SutTypes => {
  const signOutStub = new SignOutStub();
  const sut = new SignOutController(signOutStub);

  return {
    sut,
    signOutStub,
  };
};

const makeFakeHttpRequest = (): HttpRequest => {
  return {
    headers: {
      cookie: 'token_v1=sample.refresh.token',
    },
  };
};

describe('SignOutController', () => {
  it('should call SignOut with given params', async () => {
    const { sut, signOutStub } = makeSut();

    const signOutSpy = jest.spyOn(signOutStub, 'execute');
    const httpRequest = makeFakeHttpRequest();
    await sut.handle(httpRequest);

    expect(signOutSpy).toHaveBeenCalledWith('sample.refresh.token');
  });

  it('should return 200 on success', async () => {
    const { sut } = makeSut();

    const httpResponse = await sut.handle(makeFakeHttpRequest());

    const refreshCookie = {
      token: '',
    };

    expect(httpResponse).toEqual(
      ok(
        {
          message: 'signed out successfully',
        },
        refreshCookie
      )
    );
  });
});
