export const createPageSchema = {
  type: 'object',
  properties: {
    title: {
      type: 'string',
    },
    icon: {
      type: 'string',
    },
    coverPicture: {
      type: 'object',
      properties: {
        url: {
          type: 'string',
        },
      },
      required: ['url'],
    },
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
    favorite: {
      type: 'array',
      items: {
        type: 'string',
      },
    },
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
          type: 'boolean',
        },
      },
      required: ['font', 'smallText', 'fullWidth', 'lock'],
    },
    path: {
      type: ['string', 'null'],
    },
    workspaceId: {
      type: 'string',
    },
  },
  required: [
    'title',
    'icon',
    'coverPicture',
    'content',
    'favorite',
    'pageSettings',
    'path',
    'workspaceId',
  ],
};
