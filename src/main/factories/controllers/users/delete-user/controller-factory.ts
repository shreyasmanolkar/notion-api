import { BaseController } from '@infrastructure/http/controllers/BaseController';
import { DeleteUserController } from '@infrastructure/http/controllers/users/DeleteUserController';
import { makeDeletePagesByWorkspaceId } from '@main/factories/use-cases/pages/delete-pages-by-workspace-id-factory';
import { makeDeleteUser } from '@main/factories/use-cases/users/delete-user-factory';
import { makeGetWorkspacesByUserId } from '@main/factories/use-cases/users/get-workspaces-by-user-id-factory';
import { makeDeleteWorkspace } from '@main/factories/use-cases/workspaces/delete-workspace-factory';
import { makeGetAllMembersByWorkspaceId } from '@main/factories/use-cases/workspaces/get-all-members-by-workspace-id-factory';
import { makeRemoveMemberByWorkspaceId } from '@main/factories/use-cases/workspaces/remove-member-by-workspace-id-factory';

export const makeDeleteUserController = (): BaseController => {
  const deleteUserUseCase = makeDeleteUser();
  const getWorkspacesByUserIdUseCase = makeGetWorkspacesByUserId();
  const getAllMembersByWorkspaceIdUseCase = makeGetAllMembersByWorkspaceId();
  const removeMemberByWorkspaceIdUseCase = makeRemoveMemberByWorkspaceId();
  const deletePagesByWorkspaceIdUseCase = makeDeletePagesByWorkspaceId();
  const deleteWorkspaceUseCase = makeDeleteWorkspace();

  return new DeleteUserController(
    deleteUserUseCase,
    getWorkspacesByUserIdUseCase,
    getAllMembersByWorkspaceIdUseCase,
    removeMemberByWorkspaceIdUseCase,
    deletePagesByWorkspaceIdUseCase,
    deleteWorkspaceUseCase
  );
};
