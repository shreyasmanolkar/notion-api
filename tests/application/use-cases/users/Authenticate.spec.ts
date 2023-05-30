import { ForbiddenError } from '@application/errors/ForbiddenError';
import { Authenticate } from '@application/use-cases/users/Authenticate';
import { JWTVerifierStub } from '@tests/infrastructure/mocks/users/cryptography';

type SutTypes = {
  sut: Authenticate;
  jwtVerifierStub: JWTVerifierStub;
};

const makesSut = (): SutTypes => {
  const jwtVerifierStub = new JWTVerifierStub();
  const sut = new Authenticate(jwtVerifierStub);

  return {
    sut,
    jwtVerifierStub,
  };
};

describe('Authenticate', () => {
  it('should call Authenticate with correct data', async () => {
    const { sut, jwtVerifierStub } = makesSut();
    const jwtVerifierSpy = jest.spyOn(jwtVerifierStub, 'verifyAccessToken');
    const authToken = 'sample-auth-token';
    await sut.execute(authToken);

    expect(jwtVerifierSpy).toHaveBeenCalledWith(authToken);
  });

  it('should return ForbiddenError if auth token is not verified', async () => {
    const { sut, jwtVerifierStub } = makesSut();

    jest
      .spyOn(jwtVerifierStub, 'verifyAccessToken')
      .mockImplementation(async () => {
        return null;
      });

    const authToken = 'sample-auth-token';
    const response = await sut.execute(authToken);

    expect(response).toEqual(new ForbiddenError());
  });
});
