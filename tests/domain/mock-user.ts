import { User } from '@domain/entities/User';

const mockUser = (): User => {
  return new User({
    id: '112233445566778899aabbcc',
    name: 'sample-name',
    email: 'sample@email.com',
    password: 'sample-password',
    isDarkMode: true,
    profilePicture: {
      url: 'sample-url',
    },
    workspaces: [
      {
        workspaceId: '112233445566778899bbccaa',
        workspaceName: 'sample-name',
        workspaceIcon: '1f30e',
        favorites: ['sample-page-1'],
      },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  });
};

export default mockUser;
