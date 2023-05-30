export const createWorkspaceSchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
    },
    icon: {
      type: 'string',
    },
  },
  required: ['name', 'icon'],
};
