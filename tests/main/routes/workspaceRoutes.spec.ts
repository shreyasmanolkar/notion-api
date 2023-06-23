/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable camelcase */
import { WorkspaceRepository } from '@infrastructure/db/mongodb/repositories/WorkspaceRepository';
import dbConnection from '@infrastructure/db/mongodb/helpers/db-connection';
import setupApp from '@main/config/app';
import env from '@main/config/env';
import { Collection } from 'mongodb';
import request from 'supertest';
import bcrypt from 'bcrypt';
import { objectIdToString } from '@infrastructure/db/mongodb/helpers/mapper';
import { UserRepository } from '@infrastructure/db/mongodb/repositories/UserRepository';

describe('workspace routes', () => {
  const app = setupApp();
  let userCollection: Collection;
  let workspaceCollection: Collection;

  beforeAll(async () => {
    await dbConnection.connect(env.mongoUrl);
  });

  afterAll(async () => {
    await dbConnection.disconnect();
  });

  beforeEach(async () => {
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
          title: 'sample-page',
        },
        {
          id: 'sample-page-id-1',
          reference: 'sample-page-123',
          path: null,
          icon: '1F3F9',
          title: 'sample-page',
        },
        {
          id: 'sample-page-id-2',
          reference: 'sample-page-456',
          path: ',sample-page-123,',
          icon: '1F3F9',
          title: 'sample-page',
        },
        {
          id: 'sample-page-id-3',
          reference: 'sample-page-789',
          path: ',sample-page-123,',
          icon: '1F3F9',
          title: 'sample-page',
        },
        {
          id: 'sample-page-id-4',
          reference: 'sample-page-101',
          path: ',sample-page-123,sample-page-789',
          icon: '1F3F9',
          title: 'sample-page',
        },
      ],
    });

    return objectIdToString(insertedId);
  };

  const getTokens = async (): Promise<{
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
          workspaceId: 'any-workspaceId',
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

  describe('GET /workspaces/:workspaceId', () => {
    it('should return 200 on success and return workspace', async () => {
      const tokens = await getTokens();
      const { accessToken } = tokens;

      const workspaceId = await getWorkspace();

      await request(app)
        .get(`/v1/workspaces/${workspaceId}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .expect('Content-Type', /json/)
        .expect(200);
    });

    it('should return 404 if workspace is not found', async () => {
      const tokens = await getTokens();
      const { accessToken } = tokens;

      const workspaceId = 'new-workspaceId';

      await request(app)
        .get(`/v1/workspaces/${workspaceId}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(404);
    });
  });

  describe('GET /workspaces/:workspaceId/members', () => {
    it('should return 200 on success and return array of members', async () => {
      const tokens = await getTokens();
      const { accessToken } = tokens;

      const workspaceId = await getWorkspace();

      await request(app)
        .get(`/v1/workspaces/${workspaceId}/members`)
        .set('Authorization', `Bearer ${accessToken}`)
        .expect('Content-Type', /json/)
        .expect(200);
    });

    it('should return 404 if workspace is not found', async () => {
      const tokens = await getTokens();
      const { accessToken } = tokens;

      const workspaceId = 'new-workspaceId';

      await request(app)
        .get(`/v1/workspaces/${workspaceId}/members`)
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(404);
    });
  });

  describe('GET /workspaces/:workspaceId/pages/root', () => {
    it('should return 200 on success and return array of root pages', async () => {
      const tokens = await getTokens();
      const { accessToken } = tokens;

      const workspaceId = await getWorkspace();

      await request(app)
        .get(`/v1/workspaces/${workspaceId}/pages/root`)
        .set('Authorization', `Bearer ${accessToken}`)
        .expect('Content-Type', /json/)
        .expect(200);
    });

    it('should return 404 if workspace is not found', async () => {
      const tokens = await getTokens();
      const { accessToken } = tokens;

      const workspaceId = 'new-workspaceId';

      await request(app)
        .get(`/v1/workspaces/${workspaceId}/pages/root`)
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(404);
    });
  });

  describe('GET /workspaces/:workspaceId/pages/:pageReference/childrens', () => {
    it('should return 200 on success and return array of child pages', async () => {
      const tokens = await getTokens();
      const { accessToken } = tokens;

      const workspaceId = await getWorkspace();
      const pageReference = 'sample-page-123';

      await request(app)
        .get(`/v1/workspaces/${workspaceId}/pages/${pageReference}/childrens`)
        .set('Authorization', `Bearer ${accessToken}`)
        .expect('Content-Type', /json/)
        .expect(200);
    });

    it('should return 404 if workspace is not found', async () => {
      const tokens = await getTokens();
      const { accessToken } = tokens;

      const workspaceId = 'new-workspaceId';
      const pageReference = 'sample-page-123';

      await request(app)
        .get(`/v1/workspaces/${workspaceId}/pages/${pageReference}/childrens`)
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(404);
    });
  });

  describe('POST /workspaces', () => {
    it('should return 200 on creating workspaces success', async () => {
      const tokens = await getTokens();
      const { accessToken } = tokens;

      await request(app)
        .post('/v1/workspaces')
        .send({
          name: 'workspace-sample-name',
          icon: 'sample-hex',
          members: ['sample-user-id'],
        })
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(201);
    });

    it('should return 400 on not passed required fields', async () => {
      const tokens = await getTokens();
      const { accessToken } = tokens;

      await request(app)
        .post('/v1/workspaces')
        .send({
          icon: 'sample-hex',
          members: ['sample-user-id'],
        })
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(400);
    });
  });

  describe('POST /workspaces/:workspaceId/pages', () => {
    it('should return 204 on success and add page', async () => {
      const tokens = await getTokens();
      const { accessToken } = tokens;

      const workspaceId = await getWorkspace();

      await request(app)
        .post(`/v1/workspaces/${workspaceId}/pages`)
        .send({
          id: 'sample-page-id',
          reference: 'sample-page-reference',
          icon: 'sample-hex',
          path: null,
        })
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(204);
    });

    it('should return 404 if workspace is not found', async () => {
      const tokens = await getTokens();
      const { accessToken } = tokens;

      const workspaceId = 'new-workspaceId';

      await request(app)
        .post(`/v1/workspaces/${workspaceId}/pages`)
        .send({
          id: 'sample-page-id',
          reference: 'sample-page-reference',
          icon: 'sample-hex',
          path: null,
        })
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(404);
    });
  });

  describe('POST /workspaces/:workspaceId/members/:memberId', () => {
    it('should return 204 on success and add member', async () => {
      const tokens = await getTokens();
      const { accessToken } = tokens;

      const workspaceId = await getWorkspace();
      const memberId = 'new-member-id';

      await request(app)
        .post(`/v1/workspaces/${workspaceId}/members/${memberId}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(204);
    });

    it('should return 404 if workspace is not found', async () => {
      const tokens = await getTokens();
      const { accessToken } = tokens;

      const workspaceId = 'new-workspaceId';
      const memberId = 'new-member-id';

      await request(app)
        .post(`/v1/workspaces/${workspaceId}/members/${memberId}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(404);
    });
  });

  describe('PATCH /workspaces/:workspaceId', () => {
    it('should return 200 on success and user', async () => {
      const tokens = await getTokens();
      const { accessToken } = tokens;

      const workspaceId = await getWorkspace();

      await request(app)
        .patch(`/v1/workspaces/${workspaceId}`)
        .send({
          name: 'v2-upadated-name',
        })
        .set('Authorization', `Bearer ${accessToken}`)
        .expect('Content-Type', /json/)
        .expect(200);
    });

    it('should return 404 if user is not found', async () => {
      const tokens = await getTokens();
      const { accessToken } = tokens;

      const workspaceId = 'no-workspace';

      await request(app)
        .patch(`/v1/workspaces/${workspaceId}`)
        .send({
          name: 'upadated-name',
        })
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(404);
    });
  });

  describe('DELETE /workspaces/:workspaceId/pages/:pageId', () => {
    it('should return 204 on success and remove page', async () => {
      const tokens = await getTokens();
      const { accessToken } = tokens;

      const workspaceId = await getWorkspace();
      const pageId = 'sample-page-id-0';

      await request(app)
        .delete(`/v1/workspaces/${workspaceId}/pages/${pageId}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(204);
    });

    it('should return 404 if workspace is not found', async () => {
      const tokens = await getTokens();
      const { accessToken } = tokens;

      const workspaceId = 'new-workspaceId';
      const pageId = 'sample-page-id-0';

      await request(app)
        .delete(`/v1/workspaces/${workspaceId}/pages/${pageId}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(404);
    });
  });

  describe('DELETE /workspaces/:workspaceId/members/:memberId', () => {
    it('should return 204 on success and remove member', async () => {
      const tokens = await getTokens();
      const { accessToken } = tokens;

      const workspaceId = await getWorkspace();
      const memberId = 'new-member-id';

      await request(app)
        .delete(`/v1/workspaces/${workspaceId}/members/${memberId}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(204);
    });

    it('should return 404 if workspace is not found', async () => {
      const tokens = await getTokens();
      const { accessToken } = tokens;

      const workspaceId = 'new-workspaceId';
      const memberId = 'new-member-id';

      await request(app)
        .delete(`/v1/workspaces/${workspaceId}/members/${memberId}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(404);
    });
  });

  describe('DELETE /workspaces/:workspaceId', () => {
    it('should return 204', async () => {
      const tokens = await getTokens();
      const { accessToken } = tokens;

      const workspaceId = await getWorkspace();

      await request(app)
        .delete(`/v1/workspaces/${workspaceId}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(204);
    });
  });
});
