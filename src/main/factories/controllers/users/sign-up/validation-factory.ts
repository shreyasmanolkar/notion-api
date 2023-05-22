import { PayloadValidator } from '@infrastructure/http/validations/PayloadValidator';
import { signUpSchema } from '@main/schemas/sign-up-schema';

export const makeSignUpValidation = (): PayloadValidator => {
  const schema = signUpSchema;

  return new PayloadValidator(schema, 'body');
};
