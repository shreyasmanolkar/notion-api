import 'module-alias/register';
import dbConnection from '@infrastructure/db/mongodb/helpers/db-connection';
import env from '@main/config/env';
import setupApp from '@main/config/app';

dbConnection
  .connect(env.mongoUrl)
  .then(async () => {
    const app = setupApp();
    app.listen(env.port, () => {
      // eslint-disable-next-line no-console
      console.log(`server is listining on port ${env.port}`);
    });
  })
  // eslint-disable-next-line no-console
  .catch(console.error);
