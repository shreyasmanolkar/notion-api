import { BaseController } from '@infrastructure/http/controllers/BaseController';
import { AddMemberByWorkspaceIdController } from '@infrastructure/http/controllers/workspaces/AddMemberByWorkspaceIdController';
import { makeAddMemberByWorkspaceId } from '@main/factories/use-cases/workspaces/add-member-by-workspace-id-factory';
import { makeGetWorkspaceById } from '@main/factories/use-cases/workspaces/get-workspace-by-id-factory';

export const makeAddMemberByWorkspaceIdController = (): BaseController => {
  const getWorkspaceByIdUseCase = makeGetWorkspaceById();
  const addMemberByWorkspaceIdUseCase = makeAddMemberByWorkspaceId();

  return new AddMemberByWorkspaceIdController(
    getWorkspaceByIdUseCase,
    addMemberByWorkspaceIdUseCase
  );
};
