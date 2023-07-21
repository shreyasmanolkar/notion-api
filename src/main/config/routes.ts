import path from 'path';
import express, { Express, Router } from 'express';
import userRoutes from '@main/routes/user-routes';
import workspaceRoutes from '@main/routes/workspace-routes';
import pageRoutes from '@main/routes/page-routes';
import env from '@main/config/env';

export default (app: Express): void => {
  const router = Router();

  app.use('/v1', router);
  userRoutes(router);
  workspaceRoutes(router);
  pageRoutes(router);

  if (env.nodeEnv === 'production') {
    // eslint-disable-next-line no-underscore-dangle
    const __dirname = path.resolve('../');
    const staticPath = path.join(__dirname, 'notion-browser-client/build');
    app.use(express.static(staticPath));

    app.get('*', (req, res) => {
      res.type('html');
      res.sendFile(
        path.resolve(__dirname, 'notion-browser-client', 'build', 'index.html')
      );
    });
  } else {
    app.get('/test', (req, res) => {
      res.status(200).json({ message: 'ok' });
    });
  }
};
