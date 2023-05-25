export const createWorkspaceSchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
    },
    icon: {
      type: 'string',
    },
    members: {
      type: 'array',
      items: {
        type: 'string',
      },
    },
  },
  required: ['name', 'icon', 'members'],
};
