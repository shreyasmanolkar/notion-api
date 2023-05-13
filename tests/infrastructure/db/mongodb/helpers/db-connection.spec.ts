import dbConnection from '@infrastructure/db/mongodb/helpers/db-connection';
import env from '@main/config/env';

describe('DbConnection', () => {
  beforeAll(async () => {
    await dbConnection.connect(env.mongoUrl);
  });

  afterAll(async () => {
    await dbConnection.disconnect();
  });

  it('should reconnect if mongodb is down', async () => {
    let collection = await dbConnection.getCollection('notion');
    expect(collection).toBeTruthy();
    await dbConnection.disconnect();
    collection = await dbConnection.getCollection('notion');
    expect(collection).toBeTruthy();
  });
});
