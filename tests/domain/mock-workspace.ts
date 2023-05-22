import { Workspace } from '@domain/entities/Workspace';

const mockWorkspace = (): Workspace => {
  return new Workspace({
    id: '112233445566778899bbccaa',
    name: 'sample-workspace-name',
    icon: 'sample-icon-url',
    members: ['112233445566778899aabbcc'],
    page: [
      {
        reference: 'sample-page-123',
        path: '/sample-page-123',
        children: {
          'sample-page-456': {
            path: '/sample-page-123/sample-page-456',
            children: {},
          },
        },
      },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  });
};

export default mockWorkspace;
