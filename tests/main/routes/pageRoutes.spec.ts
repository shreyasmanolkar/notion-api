/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable camelcase */
import dbConnection from '@infrastructure/db/mongodb/helpers/db-connection';
import { PageRepository } from '@infrastructure/db/mongodb/repositories/PageRepository';
import { UserRepository } from '@infrastructure/db/mongodb/repositories/UserRepository';
import { WorkspaceRepository } from '@infrastructure/db/mongodb/repositories/WorkspaceRepository';
import setupApp from '@main/config/app';
import env from '@main/config/env';
import request from 'supertest';
import bcrypt from 'bcrypt';
import { Collection } from 'mongodb';
import { objectIdToString } from '@infrastructure/db/mongodb/helpers/mapper';

describe('page routes', () => {
  const app = setupApp();
  let pageCollection: Collection;
  let workspaceCollection: Collection;
  let userCollection: Collection;

  beforeAll(async () => {
    await dbConnection.connect(env.mongoUrl);
  });

  afterAll(async () => {
    await dbConnection.disconnect();
  });

  beforeEach(async () => {
    pageCollection = await PageRepository.getCollection();
    await pageCollection.deleteMany({});

    userCollection = await UserRepository.getCollection();
    await userCollection.deleteMany({});

    workspaceCollection = await WorkspaceRepository.getCollection();
    await workspaceCollection.deleteMany({});
  });

  const getWorkspace = async (): Promise<string> => {
    const { insertedId } = await workspaceCollection.insertOne({
      name: 'sample-workspace-name',
      icon: 'sample-icon-url',
      members: ['112233445566778899aabbcc'],
      pages: [
        {
          id: 'sample-page-id-0',
          reference: 'sample-page-007',
          path: null,
          icon: '1F3F9',
        },
      ],
    });

    return objectIdToString(insertedId);
  };

  const getPage = async (workspaceId?: string): Promise<string> => {
    const { insertedId } = await pageCollection.insertOne({
      reference:
        'sample-title-81d355314e218095cafcf3ac54b1efee3fe8fe767070b4796a52482ae8d0b216',
      title: 'sample title',
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
      favorite: ['112233445566778899aabbcc', 'new-sample-user'],
      pageSettings: {
        font: 'serif',
        smallText: true,
        fullWidth: true,
        lock: false,
      },
      path: null,
      workspaceId: workspaceId || '112233445566778899bbccaa',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return objectIdToString(insertedId);
  };

  const getTokens = async (
    workspaceId?: string
  ): Promise<{
    accessToken: string;
    refreshToken: string;
  }> => {
    const hashedPassword = await bcrypt.hash('any-password', env.bcryptSalt);
    await userCollection.insertOne({
      name: 'any-name',
      email: 'any@email.com',
      password: hashedPassword,
      isDarkMode: true,
      profilePicture: {
        url: 'any-url',
      },
      workspaces: [
        {
          workspaceId: workspaceId || 'any-workspaceId',
          favorites: ['any-page-1'],
        },
        {
          workspaceId: 'another-workspaceId',
          favorites: ['another-page-1', 'another-page-2', 'another-page-3'],
        },
      ],
    });

    const response = await request(app).post('/v1/login').send({
      email: 'any@email.com',
      password: 'any-password',
    });

    const cookiesArray = response.headers['set-cookie'];
    const cookies: { [key: string]: string } = {};

    cookiesArray.forEach((cookieString: string) => {
      const cookieParts = cookieString.split(';');
      const [cookieName, cookieValue] = cookieParts[0].trim().split('=');
      cookies[cookieName] = cookieValue;
    });

    const { token_v1 } = cookies;

    const { accessToken } = response.body;

    const tokens = {
      accessToken,
      refreshToken: token_v1,
    };

    return tokens;
  };

  describe('GET /pages/:pageId', () => {
    it('should return 200 on success and return page', async () => {
      const workspaceId = await getWorkspace();
      const tokens = await getTokens(workspaceId);
      const { accessToken } = tokens;

      const pageId = await getPage(workspaceId);

      await request(app)
        .get(`/v1/pages/${pageId}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .expect('Content-Type', /json/)
        .expect(200);
    });

    it('should return 403 if page is not found', async () => {
      const workspaceId = await getWorkspace();
      const tokens = await getTokens(workspaceId);
      const { accessToken } = tokens;

      const pageId = 'new-page-Id';

      await request(app)
        .get(`/v1/pages/${pageId}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(403);
    });
  });

  describe('GET /pages/:pageId/content', () => {
    it('should return 200 on success and return page content', async () => {
      const workspaceId = await getWorkspace();
      const tokens = await getTokens(workspaceId);
      const { accessToken } = tokens;

      const pageId = await getPage(workspaceId);

      await request(app)
        .get(`/v1/pages/${pageId}/content`)
        .set('Authorization', `Bearer ${accessToken}`)
        .expect('Content-Type', /json/)
        .expect(200);
    });

    it('should return 403 if page is not found', async () => {
      const workspaceId = await getWorkspace();
      const tokens = await getTokens(workspaceId);
      const { accessToken } = tokens;

      const pageId = 'new-page-Id';

      await request(app)
        .get(`/v1/pages/${pageId}/content`)
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(403);
    });
  });

  describe('GET /pages/:pageId/settings', () => {
    it('should return 200 on success and return page settings', async () => {
      const workspaceId = await getWorkspace();
      const tokens = await getTokens(workspaceId);
      const { accessToken } = tokens;

      const pageId = await getPage(workspaceId);

      await request(app)
        .get(`/v1/pages/${pageId}/settings`)
        .set('Authorization', `Bearer ${accessToken}`)
        .expect('Content-Type', /json/)
        .expect(200);
    });

    it('should return 403 if page is not found', async () => {
      const workspaceId = await getWorkspace();
      const tokens = await getTokens(workspaceId);
      const { accessToken } = tokens;

      const pageId = 'new-page-Id';

      await request(app)
        .get(`/v1/pages/${pageId}/settings`)
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(403);
    });
  });

  describe('POST /pages', () => {
    it('should return 201 on creating page success', async () => {
      const tokens = await getTokens();
      const { accessToken } = tokens;

      await request(app)
        .post('/v1/pages')
        .send({
          title: 'sample-title',
          icon: 'sapmle-icon',
          coverPicture: {
            url: 'http://sample-url',
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
        })
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(201);
    });

    it('should return 400 on not passed required fields', async () => {
      const tokens = await getTokens();
      const { accessToken } = tokens;

      await request(app)
        .post('/v1/pages')
        .send({
          title: 'sample-title',
          icon: 'sapmle-icon',
        })
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(400);
    });
  });

  describe('POST /pages/:pageId/favorites', () => {
    it('should return 204 on success and user to favorite', async () => {
      const workspaceId = await getWorkspace();
      const tokens = await getTokens(workspaceId);
      const { accessToken } = tokens;

      const pageId = await getPage(workspaceId);

      await request(app)
        .post(`/v1/pages/${pageId}/favorites`)
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(204);
    });

    it('should return 403 if workspace is not found', async () => {
      const workspaceId = await getWorkspace();
      const tokens = await getTokens(workspaceId);
      const { accessToken } = tokens;

      const pageId = 'new-workspaceId';

      await request(app)
        .post(`/v1/pages/${pageId}/favorites`)
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(403);
    });
  });

  describe('PATCH /pages/:pageId/content', () => {
    it('should return 204 on success', async () => {
      const workspaceId = await getWorkspace();
      const tokens = await getTokens(workspaceId);
      const { accessToken } = tokens;

      const pageId = await getPage(workspaceId);

      await request(app)
        .patch(`/v1/pages/${pageId}/content`)
        .send({
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
                        text: 'Updated Notion Content',
                      },
                    ],
                  },
                ],
              },
            ],
          },
        })
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(204);
    });

    it('should return 403 if page is not found', async () => {
      const workspaceId = await getWorkspace();
      const tokens = await getTokens(workspaceId);
      const { accessToken } = tokens;

      const pageId = 'no-user';

      await request(app)
        .patch(`/v1/pages/${pageId}/content`)
        .send({
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
                        text: 'Updated Notion Content',
                      },
                    ],
                  },
                ],
              },
            ],
          },
        })
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(403);
    });
  });

  describe('PATCH /pages/:pageId/cover', () => {
    it('should return 204 on success', async () => {
      const workspaceId = await getWorkspace();
      const tokens = await getTokens(workspaceId);
      const { accessToken } = tokens;

      const pageId = await getPage(workspaceId);

      await request(app)
        .patch(`/v1/pages/${pageId}/cover`)
        .send({
          url: 'http://new-sample-url.com',
        })
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(204);
    });

    it('should return 403 if page is not found', async () => {
      const workspaceId = await getWorkspace();
      const tokens = await getTokens(workspaceId);
      const { accessToken } = tokens;

      const pageId = 'no-user';

      await request(app)
        .patch(`/v1/pages/${pageId}/cover`)
        .send({
          url: 'http://new-sample-url.com',
        })
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(403);
    });
  });

  describe('PATCH /pages/:pageId/icon', () => {
    it('should return 204 on success', async () => {
      const workspaceId = await getWorkspace();
      const tokens = await getTokens(workspaceId);
      const { accessToken } = tokens;

      const pageId = await getPage(workspaceId);

      await request(app)
        .patch(`/v1/pages/${pageId}/icon`)
        .send({
          icon: 'sample-hex',
        })
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(204);
    });

    it('should return 403 if page is not found', async () => {
      const workspaceId = await getWorkspace();
      const tokens = await getTokens(workspaceId);
      const { accessToken } = tokens;

      const pageId = 'no-user';

      await request(app)
        .patch(`/v1/pages/${pageId}/icon`)
        .send({
          icon: 'sample-hex',
        })
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(403);
    });
  });

  describe('PATCH /pages/:pageId/settings', () => {
    it('should return 204 on success', async () => {
      const workspaceId = await getWorkspace();
      const tokens = await getTokens(workspaceId);
      const { accessToken } = tokens;

      const pageId = await getPage(workspaceId);

      await request(app)
        .patch(`/v1/pages/${pageId}/settings`)
        .send({
          settings: {
            font: 'monospace',
            smallText: true,
            fullWidth: true,
            lock: false,
          },
        })
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(204);
    });

    it('should return 403 if page is not found', async () => {
      const workspaceId = await getWorkspace();
      const tokens = await getTokens(workspaceId);
      const { accessToken } = tokens;

      const pageId = 'no-user';

      await request(app)
        .patch(`/v1/pages/${pageId}/settings`)
        .send({
          settings: {
            lock: false,
          },
        })
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(403);
    });
  });

  describe('PATCH /pages/:pageId/title', () => {
    it('should return 204 on success', async () => {
      const workspaceId = await getWorkspace();
      const tokens = await getTokens(workspaceId);
      const { accessToken } = tokens;

      const pageId = await getPage(workspaceId);

      await request(app)
        .patch(`/v1/pages/${pageId}/title`)
        .send({
          title: 'sample-new-title',
        })
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(204);
    });

    it('should return 403 if page is not found', async () => {
      const workspaceId = await getWorkspace();
      const tokens = await getTokens(workspaceId);
      const { accessToken } = tokens;

      const pageId = 'no-user';

      await request(app)
        .patch(`/v1/pages/${pageId}/title`)
        .send({
          title: 'sample-new-title',
        })
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(403);
    });
  });

  describe('DELETE /pages/:pageId/favorites', () => {
    it('should return 204 on success and remove member', async () => {
      const workspaceId = await getWorkspace();
      const tokens = await getTokens(workspaceId);
      const { accessToken } = tokens;

      const pageId = await getPage(workspaceId);

      await request(app)
        .delete(`/v1/pages/${pageId}/favorites`)
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(204);
    });

    it('should return 403 if workspace is not found', async () => {
      const workspaceId = await getWorkspace();
      const tokens = await getTokens(workspaceId);
      const { accessToken } = tokens;

      const pageId = 'non-existing-id';

      await request(app)
        .delete(`/v1/pages/${pageId}/favorites`)
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(403);
    });
  });

  describe('DELETE /pages/:pageId', () => {
    it('should return 204 on success', async () => {
      const workspaceId = await getWorkspace();
      const tokens = await getTokens(workspaceId);
      const { accessToken } = tokens;

      const pageId = await getPage(workspaceId);

      await request(app)
        .delete(`/v1/pages/${pageId}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(204);
    });
  });

  describe('DELETE /pages/all/:workspaceId', () => {
    it('should return 204 on success', async () => {
      const tokens = await getTokens();
      const { accessToken } = tokens;

      const workspaceId = await getWorkspace();
      await getPage(workspaceId);

      await request(app)
        .delete(`/v1/pages/all/${workspaceId}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(204);
    });
  });
});
