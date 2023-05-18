import { DeleteUser } from '@application/use-cases/users/DeleteUser';
import mockUser from '@tests/domain/mock-user';
import { DeleteUserRepositoryStub } from '@tests/infrastructure/mocks/users/repositories';

type SutTypes = {
  sut: DeleteUser;
  deleteUserRepositoryStub: DeleteUserRepositoryStub;
};

const makeSut = (): SutTypes => {
  const deleteUserRepositoryStub = new DeleteUserRepositoryStub();
  const sut = new DeleteUser(deleteUserRepositoryStub);
  return {
    sut,
    deleteUserRepositoryStub,
  };
};

describe('DeleteUser', () => {
  it('should call DeleteUserRepository with correct user id', async () => {
    const { sut, deleteUserRepositoryStub } = makeSut();
    const deleteUserSpy = jest.spyOn(deleteUserRepositoryStub, 'deleteUser');
    const { id } = mockUser();
    await sut.execute(id);
    expect(deleteUserSpy).toHaveBeenCalledWith(id);
  });
});
