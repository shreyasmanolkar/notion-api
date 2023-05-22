import { BaseController } from '@infrastructure/http/controllers/BaseController';
import { AddPageIdToFavoritesByWorkspaceIdController } from '@infrastructure/http/controllers/users/AddPageIdToFavoritesByWorkspaceIdController';
import { makeAddPageIdToFavoritesByWorkspaceId } from '@main/factories/use-cases/users/add-page-id-to-favorites-by-workspace-id-factory';
import { makeGetWorkspacesByUserId } from '@main/factories/use-cases/users/get-workspaces-by-user-id-factory';

export const makeAddPageIdToFavoritesByWorkspaceIdController =
  (): BaseController => {
    const getWorkspacesByUserIdUseCase = makeGetWorkspacesByUserId();
    const addPageIdToFavoritesByWorkspaceIdUseCase =
      makeAddPageIdToFavoritesByWorkspaceId();

    return new AddPageIdToFavoritesByWorkspaceIdController(
      getWorkspacesByUserIdUseCase,
      addPageIdToFavoritesByWorkspaceIdUseCase
    );
  };
