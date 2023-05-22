import { PayloadValidator } from '@infrastructure/http/validations/PayloadValidator';
import { updateUserSchema } from '@main/schemas/update-user-schema';

export const makeUpdateUserValidation = (): PayloadValidator => {
  const schema = updateUserSchema;

  return new PayloadValidator(schema, 'body');
};
