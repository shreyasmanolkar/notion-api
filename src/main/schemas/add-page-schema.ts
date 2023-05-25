export const addPageSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
    },
    reference: {
      type: 'string',
    },
    icon: {
      type: 'string',
    },
    path: {
      type: ['string', 'null'],
    },
  },
  required: ['id', 'reference', 'icon', 'path'],
};
