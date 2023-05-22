import { BaseController } from '@infrastructure/http/controllers/BaseController';
import { RemovePageIdFromFavoritesByWorkspaceIdController } from '@infrastructure/http/controllers/users/RemovePageIdFromFavoritesByWorkspaceIdController';
import { makeGetWorkspacesByUserId } from '@main/factories/use-cases/users/get-workspaces-by-user-id-factory';
import { makeRemovePageIdFromFavoritesByWorkspaceId } from '@main/factories/use-cases/users/remove-page-id-from-favorites-by-workspace-id-factory';

export const makeRemovePageIdFromFavoritesByWorkspaceIdController =
  (): BaseController => {
    const getWorkspacesByUserIdUseCase = makeGetWorkspacesByUserId();
    const removePageIdFromFavoritesByWorkspaceIdUseCase =
      makeRemovePageIdFromFavoritesByWorkspaceId();

    return new RemovePageIdFromFavoritesByWorkspaceIdController(
      getWorkspacesByUserIdUseCase,
      removePageIdFromFavoritesByWorkspaceIdUseCase
    );
  };
