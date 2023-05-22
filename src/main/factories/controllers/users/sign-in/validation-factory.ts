import { PayloadValidator } from '@infrastructure/http/validations/PayloadValidator';
import { signInSchema } from '@main/schemas/sign-in-schema';

export const makeSignInValidation = (): PayloadValidator => {
  const schema = signInSchema;

  return new PayloadValidator(schema, 'body');
};
