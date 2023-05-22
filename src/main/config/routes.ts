import { Express, Router } from 'express';
import userRoutes from '@main/routes/user-routes';

export default (app: Express): void => {
  const router = Router();
  app.get('/workspace', (req, res) => {
    res.status(200).json({ message: 'ok' });
  });

  app.use('/v1', router);
  userRoutes(router);
};
