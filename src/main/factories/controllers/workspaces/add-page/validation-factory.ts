import { PayloadValidator } from '@infrastructure/http/validations/PayloadValidator';
import { addPageSchema } from '@main/schemas/add-page-schema';

export const makeAddPageValidation = (): PayloadValidator => {
  const schema = addPageSchema;

  return new PayloadValidator(schema, 'body');
};
