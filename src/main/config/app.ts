import express, { Express } from 'express';
import setupRoutes from '@main/config/routes';

export default (): Express => {
  const app = express();
  setupRoutes(app);
  return app;
};
