import { PayloadValidator } from '@infrastructure/http/validations/PayloadValidator';
import { createWorkspaceSchema } from '@main/schemas/create-workspace-schema';

export const makeCreateWorkspaceValidation = (): PayloadValidator => {
  const schema = createWorkspaceSchema;

  return new PayloadValidator(schema, 'body');
};
