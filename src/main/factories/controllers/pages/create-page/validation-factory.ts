import { PayloadValidator } from '@infrastructure/http/validations/PayloadValidator';
import { createPageSchema } from '@main/schemas/create-page-schema';

export const makeCreatePageValidation = (): PayloadValidator => {
  const schema = createPageSchema;

  return new PayloadValidator(schema, 'body');
};
