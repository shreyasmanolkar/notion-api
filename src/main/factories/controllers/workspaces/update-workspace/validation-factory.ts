import { PayloadValidator } from '@infrastructure/http/validations/PayloadValidator';
import { updateWorkspaceSchema } from '@main/schemas/update-workspace-schema';

export const makeUpdateWorkspaceValidation = (): PayloadValidator => {
  const schema = updateWorkspaceSchema;

  return new PayloadValidator(schema, 'body');
};
