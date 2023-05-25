import { UserNotFoundError } from '@application/errors/UserNotFoundError';
import { UpdateUser } from '@application/use-cases/users/UpdateUser';
import mockUser from '@tests/domain/mock-user';
import {
  GetUserByIdRepositoryStub,
  UpdateUserRepositoryStub,
} from '@tests/infrastructure/mocks/users/repositories';

type SutTypes = {
  sut: UpdateUser;
  getUserByIdRepositoryStub: GetUserByIdRepositoryStub;
  updateUserRepositoryStub: UpdateUserRepositoryStub;
};

const makeSut = (): SutTypes => {
  const getUserByIdRepositoryStub = new GetUserByIdRepositoryStub();
  const updateUserRepositoryStub = new UpdateUserRepositoryStub();
  const sut = new UpdateUser(
    getUserByIdRepositoryStub,
    updateUserRepositoryStub
  );
  return {
    sut,
    getUserByIdRepositoryStub,
    updateUserRepositoryStub,
  };
};

describe('UpdateUser', () => {
  it('should call updateUserRepository with correct post id', async () => {
    const { sut, updateUserRepositoryStub } = makeSut();
    const updateUserRepositorySpy = jest.spyOn(
      updateUserRepositoryStub,
      'updateUser'
    );
    const { id, name, email, password, isDarkMode } = mockUser();
    await sut.execute({
      userId: id,
      userData: { name, email, password, isDarkMode },
    });
    expect(updateUserRepositorySpy).toHaveBeenCalledWith({
      userId: id,
      userData: { name, email, password, isDarkMode },
    });
  });

  it('should return a UserNotFoundError if GetUserByIdRepository returns null', async () => {
    const { sut, getUserByIdRepositoryStub } = makeSut();
    jest
      .spyOn(getUserByIdRepositoryStub, 'getUserById')
      .mockReturnValueOnce(Promise.resolve(null));
    const { id, name, email, password, isDarkMode } = mockUser();
    const response = await sut.execute({
      userId: id,
      userData: { name, email, password, isDarkMode },
    });
    expect(response).toEqual(new UserNotFoundError());
  });

  it('should return an updated user on success', async () => {
    const { sut } = makeSut();
    const user = mockUser();
    const { id, name, email, password, isDarkMode } = user;
    const response = await sut.execute({
      userId: id,
      userData: { name, email, password, isDarkMode },
    });
    expect(response).toEqual(user);
  });
});
