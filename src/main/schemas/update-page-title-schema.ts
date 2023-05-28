export const updatePageTitleSchema = {
  type: 'object',
  properties: {
    title: {
      type: 'string',
    },
  },
  required: ['title'],
};
