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
    '/users/:id',
    authMiddleware,
    expressRouteAdapter(makeGetUserByIdController())
  );
  router.post('/login', expressRouteAdapter(makeSignInController()));
  router.post('/register', expressRouteAdapter(makeSignUpController()));
  router.post(
    '/users/:id/workspaces/:workspaceId',
    expressRouteAdapter(makeAddWorkspaceByUserIdController())
  );
  router.post(
    '/users/:id/workspaces/:workspaceId/favorites/:pageId',
    expressRouteAdapter(makeAddPageIdToFavoritesByWorkspaceIdController())
  );
  router.patch('/users/:id', expressRouteAdapter(makeUpdateUserController()));
  router.patch(
    '/users/:id/profile-picture',
    expressRouteAdapter(makeUpdateUserProfilePictureController())
  );
  router.delete(
    '/users/:id/workspaces/:workspaceId',
    expressRouteAdapter(makeRemoveWorkspaceByUserIdController())
  );
  router.delete(
    '/users/:id/workspaces/:workspaceId/favorites/:pageId',
    expressRouteAdapter(makeRemovePageIdFromFavoritesByWorkspaceIdController())
  );
  router.delete('/users/:id', expressRouteAdapter(makeDeleteUserController()));
};
