import { Router } from 'express';
import { authMiddleware } from '@main/middlewares/auth-middleware';
import { expressRouteAdapter } from '@main/adapters/express-route-adapter';
import { makeAddPageController } from '@main/factories/controllers/workspaces/add-page/controller-factory';
import { makeGetAllRootPagesController } from '@main/factories/controllers/workspaces/get-all-root-pages/controller-factory';
import { makeCreateWorkspaceController } from '@main/factories/controllers/workspaces/create-workspace/controller-factory';
import { makeGetWorkspaceByIdController } from '@main/factories/controllers/workspaces/get-workspace-by-id/controller-factory';
import { makeAddMemberByWorkspaceIdController } from '@main/factories/controllers/workspaces/add-member-by-workspace-id/controller-factory';
import { makeGetAllMembersByWorkspaceIdController } from '@main/factories/controllers/workspaces/get-all-members-by-workspace-id/controller-factory';
import { makeGetChildrensByPageReferenceController } from '@main/factories/controllers/workspaces/get-childrens-by-page-reference/controller-factory';
import { makeDeleteWorkspaceController } from '@main/factories/controllers/workspaces/delete-workspace/controller-factory';
import { makeRemovePageByPageIdController } from '@main/factories/controllers/workspaces/remove-page-by-page-id/controller-factory';
import { makeRemoveMemberByWorkspaceIdController } from '@main/factories/controllers/workspaces/remove-member-by-workspace-id/controller-factory';
import { makeUpdateWorkspaceController } from '@main/factories/controllers/workspaces/update-workspace/controller-factory';

export default (router: Router): void => {
  router.get(
    '/workspaces/:workspaceId',
    authMiddleware,
    expressRouteAdapter(makeGetWorkspaceByIdController())
  );
  router.get(
    '/workspaces/:workspaceId/members',
    authMiddleware,
    expressRouteAdapter(makeGetAllMembersByWorkspaceIdController())
  );
  router.get(
    '/workspaces/:workspaceId/pages/root',
    authMiddleware,
    expressRouteAdapter(makeGetAllRootPagesController())
  );
  router.get(
    '/workspaces/:workspaceId/pages/:pageReference/childrens',
    authMiddleware,
    expressRouteAdapter(makeGetChildrensByPageReferenceController())
  );
  router.post(
    '/workspaces',
    authMiddleware,
    expressRouteAdapter(makeCreateWorkspaceController())
  );
  router.post(
    '/workspaces/:workspaceId/pages',
    authMiddleware,
    expressRouteAdapter(makeAddPageController())
  );
  router.post(
    '/workspaces/:workspaceId/members/:memberId',
    authMiddleware,
    expressRouteAdapter(makeAddMemberByWorkspaceIdController())
  );
  router.patch(
    '/workspaces/:workspaceId',
    authMiddleware,
    expressRouteAdapter(makeUpdateWorkspaceController())
  );
  router.delete(
    '/workspaces/:workspaceId/pages/:pageId',
    authMiddleware,
    expressRouteAdapter(makeRemovePageByPageIdController())
  );
  router.delete(
    '/workspaces/:workspaceId/members/:memberId',
    authMiddleware,
    expressRouteAdapter(makeRemoveMemberByWorkspaceIdController())
  );
  router.delete(
    '/workspaces/:workspaceId',
    authMiddleware,
    expressRouteAdapter(makeDeleteWorkspaceController())
  );
};
