import { BaseMiddleware } from '@infrastructure/http/middlewares/BaseMiddleware';
import { AuthorizationMiddleware } from '@infrastructure/http/middlewares/authorization/AuthorizationMiddleware';
import { makeAuthorization } from '@main/factories/use-cases/pages/authorization-factory';

export const makeAuthorizationMiddleware = (): BaseMiddleware => {
  const authorizationUseCase = makeAuthorization();

  return new AuthorizationMiddleware(authorizationUseCase);
};
