export const updatePageContentSchema = {
  type: 'object',
  properties: {
    content: {
      type: 'object',
      properties: {
        type: {
          type: 'string',
        },
        content: {
          type: 'array',
        },
      },
      required: ['type', 'content'],
    },
  },
  required: ['content'],
};
