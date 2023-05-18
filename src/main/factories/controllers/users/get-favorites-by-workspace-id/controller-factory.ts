import { BaseController } from '@infrastructure/http/controllers/BaseController';
import { GetFavoritesByWorkspaceIdController } from '@infrastructure/http/controllers/users/GetFavoritesByWorkspaceIdController';
import { makeGetFavoritesByWorkspaceId } from '@main/factories/use-cases/users/get-favorites-by-workspace-id-factory';
import { makeGetWorkspacesByUserId } from '@main/factories/use-cases/users/get-workspaces-by-user-id-factory';

export const makeGetFavoritesByWorkspaceIdController = (): BaseController => {
  const getWorkspacesByUserIdUseCase = makeGetWorkspacesByUserId();
  const getFavoritesByWorkspaceIdUseCase = makeGetFavoritesByWorkspaceId();

  return new GetFavoritesByWorkspaceIdController(
    getWorkspacesByUserIdUseCase,
    getFavoritesByWorkspaceIdUseCase
  );
};
