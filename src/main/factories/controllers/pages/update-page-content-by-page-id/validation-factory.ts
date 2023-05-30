import { PayloadValidator } from '@infrastructure/http/validations/PayloadValidator';
import { updatePageContentSchema } from '@main/schemas/update-page-content-schema';

export const makeUpdatePageContentByPageIdValidation = (): PayloadValidator => {
  const schema = updatePageContentSchema;

  return new PayloadValidator(schema, 'body');
};
