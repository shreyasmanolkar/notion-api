import { Collection } from 'mongodb';
import dbConnection from '@infrastructure/db/mongodb/helpers/db-connection';
import env from '@main/config/env';
import { TokenRepository } from '@infrastructure/db/mongodb/repositories/TokenRepository';

describe('Token Repository', () => {
  let tokenCollection: Collection;

  beforeAll(async () => {
    await dbConnection.connect(env.mongoUrl);
  });

  afterAll(async () => {
    await dbConnection.disconnect();
  });

  beforeEach(async () => {
    tokenCollection = await TokenRepository.getCollection();
    await tokenCollection.deleteMany({});
  });

  describe('CreateToken', () => {
    it('should create a new token and return an id on success', async () => {
      const tokenRepository = new TokenRepository();

      const sampleToken = 'sample-refresh-token';

      const response = await tokenRepository.createToken(sampleToken);

      const count = await tokenCollection.countDocuments();

      expect(response).toBeTruthy();
      expect(count).toBe(1);
    });
  });

  describe('GetToken', () => {
    it('should return token if token exists', async () => {
      const tokenRepository = new TokenRepository();

      const sampleToken = 'sample-refresh-token';

      await tokenCollection.insertOne({ token: sampleToken });

      const response = await tokenRepository.getToken(sampleToken);

      expect(response).toBeTruthy();
    });

    it(`should return null if token dosen't exists`, async () => {
      const tokenRepository = new TokenRepository();
      const response = await tokenRepository.getToken(
        '551137c2f9e1fac808a5f572'
      );

      expect(response).toBeNull();
    });
  });

  describe('DeleteToken', () => {
    it('should delete a token on success', async () => {
      const tokenRepository = new TokenRepository();

      const sampleToken = 'sample-refresh-token';

      await tokenCollection.insertOne({ token: sampleToken });

      await tokenRepository.deleteToken(sampleToken);
      const count = await tokenCollection.countDocuments();

      expect(count).toBe(0);
    });
  });
});
