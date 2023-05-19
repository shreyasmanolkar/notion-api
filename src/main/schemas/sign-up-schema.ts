export const signUpSchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
    },
    email: {
      type: 'string',
      format: 'email',
    },
    password: {
      type: 'string',
      minLength: 6,
      maxLength: 20,
    },
    isDarkMode: {
      type: 'boolean',
    },
    profilePicture: {
      type: 'object',
      properties: {
        url: {
          type: 'string',
        },
      },
      required: ['url'],
    },
  },
  required: ['name', 'email', 'password', 'isDarkMode', 'profilePicture'],
};
