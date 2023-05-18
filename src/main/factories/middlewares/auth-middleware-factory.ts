import { BaseMiddleware } from '@infrastructure/http/middlewares/BaseMiddleware';
import { AuthMiddleware } from '@infrastructure/http/middlewares/authentication/AuthMiddleware';
import { makeAuthenticate } from '@main/factories/use-cases/users/authenticate-factory';

export const makeAuthMiddleware = (): BaseMiddleware => {
  const authenticationUseCase = makeAuthenticate();

  return new AuthMiddleware(authenticationUseCase);
};
