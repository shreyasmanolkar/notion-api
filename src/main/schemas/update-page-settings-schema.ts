export const updatePageSettingsSchema = {
  type: 'object',
  properties: {
    pageSettings: {
      type: 'object',
      properties: {
        font: {
          type: 'string',
        },
        smallText: {
          type: 'boolean',
        },
        fullWidth: {
          type: 'boolean',
        },
        lock: {
          type: 'bollean',
        },
      },
      required: [],
    },
  },
  required: ['pageSettings'],
};
