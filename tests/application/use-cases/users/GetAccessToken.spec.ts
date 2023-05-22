import { ForbiddenError } from '@application/errors/ForbiddenError';
import { InvalidTokenError } from '@application/errors/InvalidTokenError';
import { GetAccessToken } from '@application/use-cases/users/GetAccessToken';
import { GetTokenRepositoryStub } from '@tests/infrastructure/mocks/tokens/repositories';
import {
  JWTGeneratorStub,
  JWTVerifierStub,
} from '@tests/infrastructure/mocks/users/cryptography';

type SutTypes = {
  sut: GetAccessToken;
  getTokenRepositoryStub: GetTokenRepositoryStub;
  jwtVerifierStub: JWTVerifierStub;
  jwtGeneratorStub: JWTGeneratorStub;
};

const makeSut = (): SutTypes => {
  const getTokenRepositoryStub = new GetTokenRepositoryStub();
  const jwtVerifierStub = new JWTVerifierStub();
  const jwtGeneratorStub = new JWTGeneratorStub();
  const sut = new GetAccessToken(
    getTokenRepositoryStub,
    jwtVerifierStub,
    jwtGeneratorStub
  );

  return {
    sut,
    getTokenRepositoryStub,
    jwtVerifierStub,
    jwtGeneratorStub,
  };
};

describe('GetAccessToken', () => {
  it('should call getTokenRepository with correct data', async () => {
    const { sut, getTokenRepositoryStub } = makeSut();

    const getTokenRepositorySpy = jest.spyOn(
      getTokenRepositoryStub,
      'getToken'
    );

    const sampleToken = 'sample-refresh-token';
    await sut.execute(sampleToken);

    expect(getTokenRepositorySpy).toHaveBeenCalledWith(sampleToken);
  });

  it('should return InvalidTokenError if token is not valid', async () => {
    const { sut, getTokenRepositoryStub } = makeSut();

    jest
      .spyOn(getTokenRepositoryStub, 'getToken')
      .mockReturnValueOnce(Promise.resolve(null));

    const sampleToken = 'sample-refresh-token';
    const response = await sut.execute(sampleToken);

    expect(response).toEqual(new InvalidTokenError());
  });

  it('should return ForbiddenError if token is not manipulated', async () => {
    const { sut, jwtVerifierStub } = makeSut();

    jest
      .spyOn(jwtVerifierStub, 'verifyRefreshToken')
      .mockReturnValueOnce(Promise.resolve(null));

    const sampleToken = 'sample-refresh-token';
    const response = await sut.execute(sampleToken);

    expect(response).toEqual(new ForbiddenError());
  });

  it('should return access token on success', async () => {
    const { sut } = makeSut();

    const sampleToken = 'sample-refresh-token';
    const response = await sut.execute(sampleToken);

    expect(response).toStrictEqual({
      accessToken: 'sample-access-token',
    });
  });
});
