import { expressMiddlewareAdapter } from '@main/adapters/express-middleware-adapter';
import { makeAuthorizationMiddleware } from '@main/factories/middlewares/authorization-middleware-factory';

export const authorizationMiddleware = expressMiddlewareAdapter(
  makeAuthorizationMiddleware()
);
