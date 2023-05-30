import { PayloadValidator } from '@infrastructure/http/validations/PayloadValidator';
import { updatePageIconSchema } from '@main/schemas/update-page-icon-schema';

export const makeUpdatePageIconByPageIdValidation = (): PayloadValidator => {
  const schema = updatePageIconSchema;

  return new PayloadValidator(schema, 'body');
};
