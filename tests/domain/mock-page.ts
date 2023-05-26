import { Page } from '@domain/entities/Page';

const mockPage = (): Page => {
  return new Page({
    id: '112233445566778899bbccaa',
    reference:
      'sample-title-81d355314e218095cafcf3ac54b1efee3fe8fe767070b4796a52482ae8d0b216',
    title: 'sample-title',
    icon: '1F54A',
    coverPicture: {
      url: 'http://sample-url.com',
    },
    content: {
      type: 'doc',
      content: [
        {
          type: 'dBlock',
          content: [
            {
              type: 'heading',
              attrs: {
                level: 1,
              },
              content: [
                {
                  type: 'text',
                  text: 'Welcome to notitap',
                },
              ],
            },
          ],
        },
      ],
    },
    favorite: ['112233445566778899aabbcc'],
    pageSettings: {
      font: 'serif',
      smallText: true,
      fullWidth: true,
      lock: false,
    },
    path: null,
    workspaceId: '112233445566778899bbccaa',
    createdAt: new Date(),
    updatedAt: new Date(),
  });
};

export default mockPage;
