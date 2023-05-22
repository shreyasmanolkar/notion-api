import { UpdateUserProfilePicture } from '@application/use-cases/users/UpdateUserProfilePicture';
import mockUser from '@tests/domain/mock-user';
import { UpdateUserProfilePictureRepositoryStub } from '@tests/infrastructure/mocks/users/repositories';

type SutTypes = {
  sut: UpdateUserProfilePicture;
  updateUserProfilePictureRepositoryStub: UpdateUserProfilePictureRepositoryStub;
};

const makeSut = (): SutTypes => {
  const updateUserProfilePictureRepositoryStub =
    new UpdateUserProfilePictureRepositoryStub();
  const sut = new UpdateUserProfilePicture(
    updateUserProfilePictureRepositoryStub
  );
  return {
    sut,
    updateUserProfilePictureRepositoryStub,
  };
};

describe('UpdateUserProfilePicture', () => {
  it('should call updateUserProfilePictureRepository with correct post id', async () => {
    const { sut, updateUserProfilePictureRepositoryStub } = makeSut();
    const updateUserProfilePictureRepositorySpy = jest.spyOn(
      updateUserProfilePictureRepositoryStub,
      'updateUserProfilePicture'
    );
    const { profilePicture, id } = mockUser();
    const { url } = profilePicture;
    await sut.execute({
      userId: id,
      url,
    });
    expect(updateUserProfilePictureRepositorySpy).toHaveBeenCalledWith({
      userId: id,
      url,
    });
  });
});
