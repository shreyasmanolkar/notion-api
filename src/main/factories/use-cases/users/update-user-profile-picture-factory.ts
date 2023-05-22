import { UpdateUserProfilePictureInterface } from '@application/interfaces/use-cases/users/UpdateUserProfilePictureInterface';
import { UpdateUserProfilePicture } from '@application/use-cases/users/UpdateUserProfilePicture';
import { UserRepository } from '@infrastructure/db/mongodb/repositories/UserRepository';

export const makeUpdateUserProfilePicture =
  (): UpdateUserProfilePictureInterface => {
    const userRepository = new UserRepository();

    return new UpdateUserProfilePicture(userRepository);
  };
