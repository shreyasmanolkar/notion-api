import { UserNotFoundError } from '@application/errors/UserNotFoundError';
import { GetUserById } from '@application/use-cases/users/GetUserById';
import mockUser from '@tests/domain/mock-user';
import { GetUserByIdRepositoryStub } from '@tests/infrastructure/mocks/users/repositories';

type SutTypes = {
  sut: GetUserById;
  getUserByIdRepositoryStub: GetUserByIdRepositoryStub;
};

const makeSut = (): SutTypes => {
  const getUserByIdRepositoryStub = new GetUserByIdRepositoryStub();
  const sut = new GetUserById(getUserByIdRepositoryStub);
  return {
    sut,
    getUserByIdRepositoryStub,
  };
};

describe('GetUserById', () => {
  it('should call GetUserByIdRepository with correct post id', async () => {
    const { sut, getUserByIdRepositoryStub } = makeSut();
    const getUserByIdRepositorySpy = jest.spyOn(
      getUserByIdRepositoryStub,
      'getUserById'
    );
    const { id } = mockUser();
    await sut.execute(id);
    expect(getUserByIdRepositorySpy).toHaveBeenCalledWith(id);
  });

  it('should return a UserNotFoundError if GetPostByIdRepository returns null', async () => {
    const { sut, getUserByIdRepositoryStub } = makeSut();
    jest
      .spyOn(getUserByIdRepositoryStub, 'getUserById')
      .mockReturnValueOnce(Promise.resolve(null));
    const { id } = mockUser();
    const response = await sut.execute(id);
    expect(response).toEqual(new UserNotFoundError());
  });

  it('should return a user on success', async () => {
    const { sut } = makeSut();
    const user = mockUser();
    const response = await sut.execute(user.id);
    expect(response).toEqual(user);
  });
});
