import { Express, Router } from 'express';

export default (app: Express): void => {
  const router = Router();
  app.get('/workspace', (req, res) => {
    res.status(200).json({ message: 'ok' });
  });

  app.use(router);
};
