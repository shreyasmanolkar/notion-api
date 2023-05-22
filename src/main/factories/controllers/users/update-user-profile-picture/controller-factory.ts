import { BaseController } from '@infrastructure/http/controllers/BaseController';
import { UpdateUserProfilePictureController } from '@infrastructure/http/controllers/users/UpdateUserProfilePictureController';
import { makeUpdateUserProfilePictureValidation } from '@main/factories/controllers/users/update-user-profile-picture/validation-factory';
import { makeGetUserById } from '@main/factories/use-cases/users/get-user-by-id-factory';
import { makeUpdateUserProfilePicture } from '@main/factories/use-cases/users/update-user-profile-picture-factory';

export const makeUpdateUserProfilePictureController = (): BaseController => {
  const validation = makeUpdateUserProfilePictureValidation();
  const getUserByIdUseCase = makeGetUserById();
  const updateUserProfilePictureUseCase = makeUpdateUserProfilePicture();

  return new UpdateUserProfilePictureController(
    validation,
    getUserByIdUseCase,
    updateUserProfilePictureUseCase
  );
};
