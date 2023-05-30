export const updatePageSettingsSchema = {
  type: 'object',
  properties: {
    settings: {
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
          type: 'boolean',
        },
      },
      required: ['font', 'smallText', 'fullWidth', 'lock'],
    },
  },
  required: ['settings'],
};
