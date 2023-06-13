import { InvalidPasswordError } from '@application/errors/InvalidPasswordError';
import { InvalidUserError } from '@application/errors/InvalidUserError';
import { SignIn } from '@application/use-cases/users/SignIn';
import mockUser from '@tests/domain/mock-user';
import { CreateTokenRepositoryStub } from '@tests/infrastructure/mocks/tokens/repositories';
import {
  HashCompareStub,
  JWTGeneratorStub,
} from '@tests/infrastructure/mocks/users/cryptography';
import { LoadUserByEmailRepositoryStub } from '@tests/infrastructure/mocks/users/repositories';

type SutTypes = {
  sut: SignIn;
  loadUserByEmailRepositoryStub: LoadUserByEmailRepositoryStub;
  createTokenRepositoryStub: CreateTokenRepositoryStub;
  hashComparerStub: HashCompareStub;
  jwtGeneratorStub: JWTGeneratorStub;
};

const makesSut = (): SutTypes => {
  const loadUserByEmailRepositoryStub = new LoadUserByEmailRepositoryStub();
  const createTokenRepositoryStub = new CreateTokenRepositoryStub();
  const hashComparerStub = new HashCompareStub();
  const jwtGeneratorStub = new JWTGeneratorStub();
  const sut = new SignIn(
    loadUserByEmailRepositoryStub,
    createTokenRepositoryStub,
    hashComparerStub,
    jwtGeneratorStub
  );

  return {
    sut,
    loadUserByEmailRepositoryStub,
    createTokenRepositoryStub,
    hashComparerStub,
    jwtGeneratorStub,
  };
};

describe('SignIn', () => {
  it('should call loadUserByEmailRepository with correct data', async () => {
    const { sut, loadUserByEmailRepositoryStub } = makesSut();
    const loadUserByEmailRepositorySpy = jest.spyOn(
      loadUserByEmailRepositoryStub,
      'loadUserByEmail'
    );
    const { email, password } = mockUser();
    await sut.execute({ email, password });

    expect(loadUserByEmailRepositorySpy).toHaveBeenCalledWith(email);
  });

  it('should return UnauthorizedError if email is not valid', async () => {
    const { sut, loadUserByEmailRepositoryStub } = makesSut();

    jest
      .spyOn(loadUserByEmailRepositoryStub, 'loadUserByEmail')
      .mockReturnValueOnce(Promise.resolve(null));

    const { email, password } = mockUser();
    const response = await sut.execute({ email, password });

    expect(response).toEqual(new InvalidUserError());
  });

  it('should return UnauthorizedError if password is not valid', async () => {
    const { sut, hashComparerStub } = makesSut();

    jest
      .spyOn(hashComparerStub, 'compare')
      .mockReturnValueOnce(Promise.resolve(false));

    const { email, password } = mockUser();
    const response = await sut.execute({ email, password });

    expect(response).toEqual(new InvalidPasswordError());
  });

  it('should call createTokenRepository with correct data', async () => {
    const { sut, createTokenRepositoryStub } = makesSut();

    const createTokenRepositorySpy = jest.spyOn(
      createTokenRepositoryStub,
      'createToken'
    );
    const { email, password } = mockUser();
    await sut.execute({ email, password });

    expect(createTokenRepositorySpy).toHaveBeenCalledWith(
      'sample-refresh-token'
    );
  });

  it('should return jwt token on success', async () => {
    const { sut } = makesSut();

    const { email, password } = mockUser();
    const response = await sut.execute({ email, password });

    expect(response).toStrictEqual({
      accessToken: 'sample-access-token',
      refreshToken: 'sample-refresh-token',
    });
  });
});
