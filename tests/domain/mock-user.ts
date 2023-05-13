import { User } from '@domain/entities/User';

const mockUser = (): User => {
  return new User({
    id: 'sample-userID',
    name: 'sample-name',
    email: 'sample@email.com',
    password: 'sample-password',
    isDarkMode: true,
    profilePicture: {
      url: 'sample-url',
    },
    workspaces: [
      {
        workspaceId: 'sample-workspaceId',
        favorites: ['sample-page-1'],
      },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  });
};

export default mockUser;
