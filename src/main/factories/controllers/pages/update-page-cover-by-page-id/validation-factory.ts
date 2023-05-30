import { PayloadValidator } from '@infrastructure/http/validations/PayloadValidator';
import { updatePageCoverSchema } from '@main/schemas/update-page-cover-schema';

export const makeUpdatePageCoverByPageIdValidation = (): PayloadValidator => {
  const schema = updatePageCoverSchema;

  return new PayloadValidator(schema, 'body');
};
