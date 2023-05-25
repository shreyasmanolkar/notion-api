import { BaseController } from '@infrastructure/http/controllers/BaseController';
import { RemoveMemberByWorkspaceIdController } from '@infrastructure/http/controllers/workspaces/RemoveMemberByWorkspaceIdController';
import { makeGetWorkspaceById } from '@main/factories/use-cases/workspaces/get-workspace-by-id-factory';
import { makeRemoveMemberByWorkspaceId } from '@main/factories/use-cases/workspaces/remove-member-by-workspace-id-factory';

export const makeRemoveMemberByWorkspaceIdController = (): BaseController => {
  const getWorkspaceByIdUseCase = makeGetWorkspaceById();
  const removeMemberByWorkspaceIdUseCase = makeRemoveMemberByWorkspaceId();

  return new RemoveMemberByWorkspaceIdController(
    getWorkspaceByIdUseCase,
    removeMemberByWorkspaceIdUseCase
  );
};
