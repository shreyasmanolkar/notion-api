export const updateUserProfilePictureSchema = {
  type: 'object',
  properties: {
    url: {
      type: 'string',
    },
  },
  required: ['url'],
};
