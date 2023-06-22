import { BaseController } from '@infrastructure/http/controllers/BaseController';
import { DeleteWorkspaceController } from '@infrastructure/http/controllers/workspaces/DeleteWorkspaceController';
import { makeDeletePagesByWorkspaceId } from '@main/factories/use-cases/pages/delete-pages-by-workspace-id-factory';
import { makeRemoveWorkspaceByUserId } from '@main/factories/use-cases/users/remove-workspace-by-user-id-factory';
import { makeDeleteWorkspace } from '@main/factories/use-cases/workspaces/delete-workspace-factory';
import { makeGetAllMembersByWorkspaceId } from '@main/factories/use-cases/workspaces/get-all-members-by-workspace-id-factory';
import { makeGetWorkspaceById } from '@main/factories/use-cases/workspaces/get-workspace-by-id-factory';

export const makeDeleteWorkspaceController = (): BaseController => {
  const getWorkspaceByIdUseCase = makeGetWorkspaceById();
  const deletePagesByWorkspaceIdUseCase = makeDeletePagesByWorkspaceId();
  const deleteWorkspaceUseCase = makeDeleteWorkspace();
  const getAllMembersByWorkspaceIdUseCase = makeGetAllMembersByWorkspaceId();
  const removeWorkspaceByUserIdUseCase = makeRemoveWorkspaceByUserId();

  return new DeleteWorkspaceController(
    getWorkspaceByIdUseCase,
    deletePagesByWorkspaceIdUseCase,
    deleteWorkspaceUseCase,
    getAllMembersByWorkspaceIdUseCase,
    removeWorkspaceByUserIdUseCase
  );
};
