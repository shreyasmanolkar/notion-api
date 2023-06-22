import { Router } from 'express';
import { expressRouteAdapter } from '@main/adapters/express-route-adapter';
import { makeSignInController } from '@main/factories/controllers/users/sign-in/controller-factory';
import { makeSignUpController } from '@main/factories/controllers/users/sign-up/controller-factory';
import { makeUpdateUserController } from '@main/factories/controllers/users/update-user/controller-factory';
import { makeAddWorkspaceByUserIdController } from '@main/factories/controllers/users/add-workspace-by-user-id/controller-factory';
import { makeRemoveWorkspaceByUserIdController } from '@main/factories/controllers/users/remove-workspace-by-user-id/controller-factory';
import { makeGetWorkspacesByUserIdController } from '@main/factories/controllers/users/get-workspaces-by-user-id/controller-factory';
import { makeAddPageIdToFavoritesByWorkspaceIdController } from '@main/factories/controllers/users/add-page-id-to-favorites-by-workspace-id/controller-factory';
import { makeRemovePageIdFromFavoritesByWorkspaceIdController } from '@main/factories/controllers/users/remove-page-id-from-favorites-by-workspace-id/controller-factory';
import { makeGetFavoritesByWorkspaceIdController } from '@main/factories/controllers/users/get-favorites-by-workspace-id/controller-factory';
import { makeUpdateUserProfilePictureController } from '@main/factories/controllers/users/update-user-profile-picture/controller-factory';
import { makeGetUserByIdController } from '@main/factories/controllers/users/get-user-by-id/controller-factory';
import { makeDeleteUserController } from '@main/factories/controllers/users/delete-user/controller-factory';
import { authMiddleware } from '@main/middlewares/auth-middleware';
import { makeSignOutController } from '@main/factories/controllers/users/sign-out/controller-factory';
import { makeGetAccessTokenController } from '@main/factories/controllers/users/get-access-token/controller-factory';
import { expressRouteSetCookieAdapter } from '@main/adapters/express-route-set-cookie-adapter';
import { expressRouteRemoveCookieAdapter } from '@main/adapters/express-route-remove-cookie-adapter';

export default (router: Router): void => {
  router.get(
    '/users/:userId/workspaces-access',
    authMiddleware,
    expressRouteAdapter(makeGetWorkspacesByUserIdController())
  );
  router.get(
    '/users/:userId/workspaces-access/:workspaceId/favorites',
    authMiddleware,
    expressRouteAdapter(makeGetFavoritesByWorkspaceIdController())
  );
  router.get(
    '/users/:userId',
    authMiddleware,
    expressRouteAdapter(makeGetUserByIdController())
  );
  router.get('/token', expressRouteAdapter(makeGetAccessTokenController()));
  router.post('/login', expressRouteSetCookieAdapter(makeSignInController()));
  router.post(
    '/logout',
    authMiddleware,
    expressRouteRemoveCookieAdapter(makeSignOutController())
  );
  router.post(
    '/register',
    expressRouteSetCookieAdapter(makeSignUpController())
  );
  router.post(
    '/users/:userId/workspaces-access/:workspaceId',
    authMiddleware,
    expressRouteAdapter(makeAddWorkspaceByUserIdController())
  );
  router.post(
    '/users/:userId/workspaces-access/:workspaceId/favorites/:pageId',
    authMiddleware,
    expressRouteAdapter(makeAddPageIdToFavoritesByWorkspaceIdController())
  );
  router.patch(
    '/users/:userId',
    authMiddleware,
    expressRouteAdapter(makeUpdateUserController())
  );
  router.patch(
    '/users/:userId/profile-picture',
    authMiddleware,
    expressRouteAdapter(makeUpdateUserProfilePictureController())
  );
  router.delete(
    '/users/:userId/workspaces-access/:workspaceId',
    authMiddleware,
    expressRouteAdapter(makeRemoveWorkspaceByUserIdController())
  );
  router.delete(
    '/users/:userId/workspaces-access/:workspaceId/favorites/:pageId',
    authMiddleware,
    expressRouteAdapter(makeRemovePageIdFromFavoritesByWorkspaceIdController())
  );
  router.delete(
    '/users/:userId',
    authMiddleware,
    expressRouteAdapter(makeDeleteUserController())
  );
};
