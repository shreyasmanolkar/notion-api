import { InvalidTokenError } from '@application/errors/InvalidTokenError';
import { GetAccessTokenController } from '@infrastructure/http/controllers/users/GetAccessTokenController';
import { ok, unauthorized } from '@infrastructure/http/helpers/http';
import { HttpRequest } from '@infrastructure/http/interfaces/HttpRequest';
import { GetAccessTokenStub } from '@tests/application/mocks/users/use-cases';

type SutTypes = {
  sut: GetAccessTokenController;
  getAccesTokenStub: GetAccessTokenStub;
};

const makeSut = (): SutTypes => {
  const getAccesTokenStub = new GetAccessTokenStub();
  const sut = new GetAccessTokenController(getAccesTokenStub);

  return {
    getAccesTokenStub,
    sut,
  };
};

const makeFakeHttpRequest = (): HttpRequest => {
  return {
    headers: {
      cookie: 'token_v1=sample.refresh.token',
    },
  };
};

describe('GetAccessToken', () => {
  it('should call GetAccessToken with given params', async () => {
    const { sut, getAccesTokenStub } = makeSut();

    const getAccesTokenSpy = jest.spyOn(getAccesTokenStub, 'execute');
    const httpRequest = makeFakeHttpRequest();
    await sut.handle(httpRequest);

    expect(getAccesTokenSpy).toHaveBeenCalledWith('sample.refresh.token');
  });

  it('should return 403 if token is invalid', async () => {
    const { sut, getAccesTokenStub } = makeSut();

    jest.spyOn(getAccesTokenStub, 'execute').mockImplementation(async () => {
      return new InvalidTokenError();
    });

    const httpResponse = await sut.handle(makeFakeHttpRequest());

    expect(httpResponse).toEqual(unauthorized(new InvalidTokenError()));
  });

  it('should return 200 on success', async () => {
    const { sut } = makeSut();

    const httpResponse = await sut.handle(makeFakeHttpRequest());

    expect(httpResponse).toEqual(
      ok({
        accessToken: 'sample-access-token',
      })
    );
  });
});
