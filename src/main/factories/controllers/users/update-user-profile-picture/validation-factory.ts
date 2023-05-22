import { PayloadValidator } from '@infrastructure/http/validations/PayloadValidator';
import { updateUserProfilePictureSchema } from '@main/schemas/update-user-profile-picture-schema';

export const makeUpdateUserProfilePictureValidation = (): PayloadValidator => {
  const schema = updateUserProfilePictureSchema;

  return new PayloadValidator(schema, 'body');
};
