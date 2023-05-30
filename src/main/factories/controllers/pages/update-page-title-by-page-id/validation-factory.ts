import { PayloadValidator } from '@infrastructure/http/validations/PayloadValidator';
import { updatePageTitleSchema } from '@main/schemas/update-page-title-schema';

export const makeUpdatePageTitleByPageIdValidation = (): PayloadValidator => {
  const schema = updatePageTitleSchema;

  return new PayloadValidator(schema, 'body');
};
