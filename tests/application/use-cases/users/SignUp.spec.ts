import { EmailInUseError } from '@application/errors/EmailInUseError';
import { SignUp } from '@application/use-cases/users/SignUp';
import mockUser from '@tests/domain/mock-user';
import { HashGeneratorStub } from '@tests/infrastructure/mocks/users/cryptography';
import {
  CreateUserRepositoryStub,
  LoadUserByEmailRepositoryStub,
} from '@tests/infrastructure/mocks/users/repositories';

type SutTypes = {
  sut: SignUp;
  loadUserByEmailRepositoryStub: LoadUserByEmailRepositoryStub;
  createUserRepositoryStub: CreateUserRepositoryStub;
  hashGeneratorStub: HashGeneratorStub;
};

const makesSut = (): SutTypes => {
  const loadUserByEmailRepositoryStub = new LoadUserByEmailRepositoryStub();
  const createUserRepositoryStub = new CreateUserRepositoryStub();
  const hashGeneratorStub = new HashGeneratorStub();
  const sut = new SignUp(
    loadUserByEmailRepositoryStub,
    createUserRepositoryStub,
    hashGeneratorStub
  );

  return {
    sut,
    loadUserByEmailRepositoryStub,
    createUserRepositoryStub,
    hashGeneratorStub,
  };
};

describe('SignUp', () => {
  it('should call loadUserByEmailRepository with correct data', async () => {
    const { sut, loadUserByEmailRepositoryStub } = makesSut();
    const loadUserByEmailRepositorySpy = jest.spyOn(
      loadUserByEmailRepositoryStub,
      'loadUserByEmail'
    );
    const { name, email, password, isDarkMode, profilePicture, workspaces } =
      mockUser();

    const userData = {
      name,
      email,
      password,
      isDarkMode,
      profilePicture,
      workspaces,
    };

    await sut.execute(userData);

    expect(loadUserByEmailRepositorySpy).toHaveBeenCalledWith(email);
  });

  it('should return EmailInUseError if email is loaded', async () => {
    const { sut, loadUserByEmailRepositoryStub } = makesSut();

    jest
      .spyOn(loadUserByEmailRepositoryStub, 'loadUserByEmail')
      .mockReturnValueOnce(Promise.resolve(mockUser()));

    const { name, email, password, isDarkMode, profilePicture, workspaces } =
      mockUser();

    const userData = {
      name,
      email,
      password,
      isDarkMode,
      profilePicture,
      workspaces,
    };

    const response = await sut.execute(userData);

    expect(response).toEqual(new EmailInUseError());
  });

  it('should return  on success', async () => {
    const { sut, loadUserByEmailRepositoryStub } = makesSut();

    const { id, name, password, isDarkMode, profilePicture, workspaces } =
      mockUser();

    jest
      .spyOn(loadUserByEmailRepositoryStub, 'loadUserByEmail')
      .mockReturnValueOnce(Promise.resolve(null));

    const userData = {
      name,
      email: 'new-sample@email.com',
      password,
      isDarkMode,
      profilePicture,
      workspaces,
    };

    const response = await sut.execute(userData);

    expect(response).toBe(id);
  });
});
