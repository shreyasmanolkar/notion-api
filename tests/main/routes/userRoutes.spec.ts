/* eslint-disable camelcase */
import dbConnection from '@infrastructure/db/mongodb/helpers/db-connection';
import { UserRepository } from '@infrastructure/db/mongodb/repositories/UserRepository';
import setupApp from '@main/config/app';
import env from '@main/config/env';
import { Collection } from 'mongodb';
import request from 'supertest';
import bcrypt from 'bcrypt';
import { TokenRepository } from '@infrastructure/db/mongodb/repositories/TokenRepository';

describe('user routes', () => {
  const app = setupApp();
  let userCollection: Collection;
  let tokenCollection: Collection;

  beforeAll(async () => {
    await dbConnection.connect(env.mongoUrl);
  });

  afterAll(async () => {
    await dbConnection.disconnect();
  });

  beforeEach(async () => {
    userCollection = await UserRepository.getCollection();
    await userCollection.deleteMany({});

    tokenCollection = await TokenRepository.getCollection();
    await tokenCollection.deleteMany({});
  });

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
          workspaceId: '112233445566778899bbccaa',
          favorites: ['any-page-1'],
        },
        {
          workspaceId: '112233445566778899bbccab',
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

  describe('POST /register', () => {
    it('should return 200 on signup success', async () => {
      await request(app)
        .post('/v1/register')
        .send({
          name: 'user-name',
          email: 'sampleuser@gmail.com',
          password: 'any-password',
          isDarkMode: true,
          profilePicture: {
            url: 'sample-url',
          },
        })
        .expect(200);
    });

    it('should return 403 if email is already in use', async () => {
      const hashedPassword = await bcrypt.hash(
        'sample-password',
        env.bcryptSalt
      );
      await userCollection.insertOne({
        name: 'user-name',
        email: 'sampleuser@gmail.com',
        password: hashedPassword,
        isDarkMode: true,
        profilePicture: {
          url: 'sample-url',
        },
        workspaces: [
          {
            workspaceId: 'any-workspaceId',
            favorites: ['any-page-1'],
          },
        ],
      });

      await request(app)
        .post('/v1/register')
        .send({
          name: 'user-name',
          email: 'sampleuser@gmail.com',
          password: 'any-password',
          isDarkMode: true,
          profilePicture: {
            url: 'sample-url',
          },
        })
        .expect(409);
    });

    it('should return 400 on not passing required fields', async () => {
      await request(app)
        .post('/v1/register')
        .send({
          email: 'sampleuser@gmail.com',
          password: 'any-password',
        })
        .expect(400);
    });
  });

  describe('POST /login', () => {
    it('should return 200 on sign in success', async () => {
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
        ],
      });

      await request(app)
        .post('/v1/login')
        .send({
          email: 'any@email.com',
          password: 'any-password',
        })
        .expect(200);
    });

    it('should return 401 on sign in failure', async () => {
      await request(app)
        .post('/v1/login')
        .send({ email: 'any-email@email.com', password: 'sample-password' })
        .expect(401);
    });
  });

  describe('POST /logout', () => {
    it('should return 200 on sign out success', async () => {
      const tokens = await getTokens();
      const { refreshToken } = tokens;
      const { accessToken } = tokens;

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
        ],
      });

      await request(app)
        .post('/v1/logout')
        .set('Cookie', `token_v1=${refreshToken}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200);
    });
  });

  describe('GET /token', () => {
    it('should return 401 if cookie is not found', async () => {
      await request(app).get('/v1/token').expect(401);
    });

    it('should return 401 if token is not found', async () => {
      await request(app)
        .get('/v1/token')
        .set('Cookie', `token_v1=sample.refresh.token`)
        .expect(401);
    });

    it('should return 200 on success', async () => {
      const tokens = await getTokens();
      const { refreshToken } = tokens;

      await tokenCollection.insertOne({
        token: refreshToken,
      });

      await request(app)
        .get('/v1/token')
        .set('Cookie', `token_v1=${refreshToken}`)
        .expect(200);
    });
  });

  describe('GET /users/:userId/workspaces-access', () => {
    it('should return 200 on success and list of workspaces', async () => {
      const tokens = await getTokens();
      const { accessToken } = tokens;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [jwtHeader, jwtPayload, jwtSignature] = accessToken.split('.');
      const decodedPayload = JSON.parse(atob(jwtPayload));

      const { userId } = decodedPayload;

      const response = await request(app)
        .get(`/v1/users/${userId}/workspaces-access`)
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200);

      const workspaces = response.body;

      expect(Array.isArray(workspaces)).toBe(true);
      expect(workspaces.length).toBeGreaterThan(0);
    });
  });

  describe('GET /users/:userId/workspaces-access/:workspaceId/favorites', () => {
    it('should return 200 on success and list of favorites pageId', async () => {
      const tokens = await getTokens();
      const { accessToken } = tokens;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [jwtHeader, jwtPayload, jwtSignature] = accessToken.split('.');
      const decodedPayload = JSON.parse(atob(jwtPayload));

      const { userId } = decodedPayload;

      const workspaceId = '112233445566778899bbccab';

      const response = await request(app)
        .get(`/v1/users/${userId}/workspaces-access/${workspaceId}/favorites`)
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200);

      const favorites = response.body;

      expect(Array.isArray(favorites)).toBe(true);
      expect(favorites.length).toBeGreaterThan(0);
    });

    it('should return 403 if workspaceId is not in workspace access', async () => {
      const tokens = await getTokens();
      const { accessToken } = tokens;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [jwtHeader, jwtPayload, jwtSignature] = accessToken.split('.');
      const decodedPayload = JSON.parse(atob(jwtPayload));

      const { userId } = decodedPayload;

      const workspaceId = 'error-workspaceId';

      await request(app)
        .get(`/v1/users/${userId}/workspaces-access/${workspaceId}/favorites`)
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(403);
    });
  });

  describe('GET /users/:userId', () => {
    it('should return 200 on success and user', async () => {
      const tokens = await getTokens();
      const { accessToken } = tokens;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [jwtHeader, jwtPayload, jwtSignature] = accessToken.split('.');
      const decodedPayload = JSON.parse(atob(jwtPayload));

      const { userId } = decodedPayload;

      await request(app)
        .get(`/v1/users/${userId}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .expect('Content-Type', /json/)
        .expect(200);
    });
  });

  describe('POST /users/:userId/workspaces-access/:workspaceId', () => {
    it('should return 204 on success and add workspaceId and favorites', async () => {
      const tokens = await getTokens();
      const { accessToken } = tokens;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [jwtHeader, jwtPayload, jwtSignature] = accessToken.split('.');
      const decodedPayload = JSON.parse(atob(jwtPayload));

      const { userId } = decodedPayload;
      const workspaceId = 'new-workspaceId';

      await request(app)
        .post(`/v1/users/${userId}/workspaces-access/${workspaceId}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(204);
    });

    it('should return 404 if user is not found', async () => {
      const tokens = await getTokens();
      const { accessToken } = tokens;

      const userId = 'no-user';
      const workspaceId = 'new-workspaceId';

      await request(app)
        .post(`/v1/users/${userId}/workspaces-access/${workspaceId}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(404);
    });
  });

  describe('POST /users/:userId/workspaces-access/:workspaceId/favorites/:pageId', () => {
    it('should return 204 on success and add pageId to favorites', async () => {
      const tokens = await getTokens();
      const { accessToken } = tokens;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [jwtHeader, jwtPayload, jwtSignature] = accessToken.split('.');
      const decodedPayload = JSON.parse(atob(jwtPayload));

      const { userId } = decodedPayload;
      const workspaceId = '112233445566778899bbccaa';
      const pageId = 'sample-new-page';

      await request(app)
        .post(
          `/v1/users/${userId}/workspaces-access/${workspaceId}/favorites/${pageId}`
        )
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(204);
    });

    it('should return 403 if workspace is not found', async () => {
      const tokens = await getTokens();
      const { accessToken } = tokens;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [jwtHeader, jwtPayload, jwtSignature] = accessToken.split('.');
      const decodedPayload = JSON.parse(atob(jwtPayload));

      const { userId } = decodedPayload;

      const workspaceId = 'non-existing-workspaceId';
      const pageId = 'sample-new-page';

      await request(app)
        .post(
          `/v1/users/${userId}/workspaces-access/${workspaceId}/favorites/${pageId}`
        )
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(403);
    });
  });

  describe('PATCH /users/:userId', () => {
    it('should return 200 on success and user', async () => {
      const tokens = await getTokens();
      const { accessToken } = tokens;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [jwtHeader, jwtPayload, jwtSignature] = accessToken.split('.');
      const decodedPayload = JSON.parse(atob(jwtPayload));

      const { userId } = decodedPayload;

      await request(app)
        .patch(`/v1/users/${userId}`)
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

      const userId = 'no-user';

      await request(app)
        .patch(`/v1/users/${userId}`)
        .send({
          name: 'upadated-name',
        })
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(404);
    });
  });

  describe('PATCH /users/:userId/profile-picture', () => {
    it('should return 204 on success', async () => {
      const tokens = await getTokens();
      const { accessToken } = tokens;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [jwtHeader, jwtPayload, jwtSignature] = accessToken.split('.');
      const decodedPayload = JSON.parse(atob(jwtPayload));

      const { userId } = decodedPayload;
      await request(app)
        .patch(`/v1/users/${userId}/profile-picture`)
        .send({
          url: 'updated-sample-url',
        })
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(204);
    });

    it('should return 404 if user is not found', async () => {
      const tokens = await getTokens();
      const { accessToken } = tokens;

      const userId = 'no-user';

      await request(app)
        .patch(`/v1/users/${userId}/profile-picture`)
        .send({
          url: 'updated-sample-url',
        })
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(404);
    });
  });

  describe('DELETE /users/:userId/workspaces-access/:workspaceId', () => {
    it('should return 204 on success', async () => {
      const tokens = await getTokens();
      const { accessToken } = tokens;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [jwtHeader, jwtPayload, jwtSignature] = accessToken.split('.');
      const decodedPayload = JSON.parse(atob(jwtPayload));

      const { userId } = decodedPayload;
      const workspaceId = '112233445566778899bbccab';

      await request(app)
        .delete(`/v1/users/${userId}/workspaces-access/${workspaceId}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(204);
    });

    it('should return 403 if workspace is not found in users workspaces-access', async () => {
      const tokens = await getTokens();
      const { accessToken } = tokens;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [jwtHeader, jwtPayload, jwtSignature] = accessToken.split('.');
      const decodedPayload = JSON.parse(atob(jwtPayload));

      const { userId } = decodedPayload;
      const workspaceId = 'other-workspace-id';

      await request(app)
        .delete(`/v1/users/${userId}/workspaces-access/${workspaceId}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(403);
    });
  });

  describe('DELETE /users/:userId/workspaces-access/:workspaceId/favorites/:pageId', () => {
    it('should return 204 on success', async () => {
      const tokens = await getTokens();
      const { accessToken } = tokens;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [jwtHeader, jwtPayload, jwtSignature] = accessToken.split('.');
      const decodedPayload = JSON.parse(atob(jwtPayload));

      const { userId } = decodedPayload;
      const workspaceId = '112233445566778899bbccab';
      const pageId = 'another-page-2';

      await request(app)
        .delete(
          `/v1/users/${userId}/workspaces-access/${workspaceId}/favorites/${pageId}`
        )
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(204);
    });

    it('should return 403 if workspace is not found in users workspaces-access', async () => {
      const tokens = await getTokens();
      const { accessToken } = tokens;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [jwtHeader, jwtPayload, jwtSignature] = accessToken.split('.');
      const decodedPayload = JSON.parse(atob(jwtPayload));

      const { userId } = decodedPayload;
      const workspaceId = 'other-workspace-id';
      const pageId = 'another-page-2';

      await request(app)
        .delete(
          `/v1/users/${userId}/workspaces-access/${workspaceId}/favorites/${pageId}`
        )
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(403);
    });
  });

  describe('DELETE /users/:userId', () => {
    it('should return 204 on success', async () => {
      const tokens = await getTokens();
      const { accessToken } = tokens;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [jwtHeader, jwtPayload, jwtSignature] = accessToken.split('.');
      const decodedPayload = JSON.parse(atob(jwtPayload));

      const { userId } = decodedPayload;

      await request(app)
        .delete(`/v1/users/${userId}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(204);
    });
  });
});
