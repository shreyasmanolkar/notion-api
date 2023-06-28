import { Workspace } from '@domain/entities/Workspace';

const mockWorkspace = (): Workspace => {
  return new Workspace({
    id: '112233445566778899bbccaa',
    name: 'sample-workspace-name',
    icon: 'sample-icon-url',
    members: ['112233445566778899aabbcc'],
    pages: [
      {
        id: 'sample-page-id-0',
        reference: 'sample-page-007',
        path: null,
        icon: '1F3F9',
        title: 'sample page',
        createdAt: new Date(),
      },
      {
        id: 'sample-page-id-1',
        reference: 'sample-page-123',
        path: null,
        icon: '1F3F9',
        title: 'sample page',
        createdAt: new Date(),
      },
      {
        id: 'sample-page-id-2',
        reference: 'sample-page-456',
        path: ',sample-page-123.',
        icon: '1F3F9',
        title: 'sample page',
        createdAt: new Date(),
      },
      {
        id: 'sample-page-id-3',
        reference: 'sample-page-789',
        path: ',sample-page-123.',
        icon: '1F3F9',
        title: 'sample page',
        createdAt: new Date(),
      },
      {
        id: 'sample-page-id-4',
        reference: 'sample-page-101',
        path: ',sample-page-123,sample-page-789.',
        icon: '1F3F9',
        title: 'sample page',
        createdAt: new Date(),
      },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  });
};

export default mockWorkspace;
