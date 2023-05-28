import { Router } from 'express';
import { expressRouteAdapter } from '@main/adapters/express-route-adapter';
import { makeAddToFavoriteController } from '@main/factories/controllers/pages/add-to-favorite/controller-factory';
import { makeCreatePageController } from '@main/factories/controllers/pages/create-page/controller-factory';
import { makeDeletePageController } from '@main/factories/controllers/pages/delete-page/controller-factory';
import { makeDeletePagesByWorkspaceIdController } from '@main/factories/controllers/pages/delete-pages-by-workspace-id/controller-factory';
import { makeGetPageByIdController } from '@main/factories/controllers/pages/get-page-by-id/controller-factory';
import { makeGetPageContentByPageIdController } from '@main/factories/controllers/pages/get-page-content-by-page-id/controller-factory';
import { makeGetPageSettingsByPageIdController } from '@main/factories/controllers/pages/get-page-settings-by-page-id/controller-factory';
import { makeRemoveFromFavoriteController } from '@main/factories/controllers/pages/remove-from-favorite/controller-factory';
import { makeUpdatePageContentByPageIdController } from '@main/factories/controllers/pages/update-page-content-by-page-id/controller-factory';
import { makeUpdatePageCoverByPageIdController } from '@main/factories/controllers/pages/update-page-cover-by-page-id/controller-factory';
import { makeUpdatePageIconByPageIdController } from '@main/factories/controllers/pages/update-page-icon-by-page-id/controller-factory';
import { makeUpdatePageSettingsByPageIdController } from '@main/factories/controllers/pages/update-page-settings-by-page-id/controller-factory';
import { makeUpdatePageTitleByPageIdController } from '@main/factories/controllers/pages/update-page-title-by-page-id/controller-factory';
import { authMiddleware } from '@main/middlewares/auth-middleware';

export default (router: Router): void => {
  router.get(
    '/pages/:pageId',
    authMiddleware,
    expressRouteAdapter(makeGetPageByIdController())
  );
  router.get(
    '/pages/:pageId/content',
    authMiddleware,
    expressRouteAdapter(makeGetPageContentByPageIdController())
  );
  router.get(
    '/pages/:pageId/settings',
    authMiddleware,
    expressRouteAdapter(makeGetPageSettingsByPageIdController())
  );
  router.post(
    '/pages',
    authMiddleware,
    expressRouteAdapter(makeCreatePageController())
  );
  router.post(
    '/pages/:pageId/favorites/:userId',
    authMiddleware,
    expressRouteAdapter(makeAddToFavoriteController())
  );
  router.patch(
    '/pages/:pageId/content',
    authMiddleware,
    expressRouteAdapter(makeUpdatePageContentByPageIdController())
  );
  router.patch(
    '/pages/:pageId/cover',
    authMiddleware,
    expressRouteAdapter(makeUpdatePageCoverByPageIdController())
  );
  router.patch(
    '/pages/:pageId/icon',
    authMiddleware,
    expressRouteAdapter(makeUpdatePageIconByPageIdController())
  );
  router.patch(
    '/pages/:pageId/settings',
    authMiddleware,
    expressRouteAdapter(makeUpdatePageSettingsByPageIdController())
  );
  router.patch(
    '/pages/:pageId/title',
    authMiddleware,
    expressRouteAdapter(makeUpdatePageTitleByPageIdController())
  );
  router.delete(
    '/pages/:pageId/favorites/:userId',
    authMiddleware,
    expressRouteAdapter(makeRemoveFromFavoriteController())
  );
  router.delete(
    '/pages/:pageId',
    authMiddleware,
    expressRouteAdapter(makeDeletePageController())
  );
  router.delete(
    '/pages/all/:workspaceId',
    authMiddleware,
    expressRouteAdapter(makeDeletePagesByWorkspaceIdController())
  );
};
