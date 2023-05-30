import { PayloadValidator } from '@infrastructure/http/validations/PayloadValidator';
import { updatePageSettingsSchema } from '@main/schemas/update-page-settings-schema';

export const makeUpdatePageSettingsByPageIdValidation =
  (): PayloadValidator => {
    const schema = updatePageSettingsSchema;

    return new PayloadValidator(schema, 'body');
  };
