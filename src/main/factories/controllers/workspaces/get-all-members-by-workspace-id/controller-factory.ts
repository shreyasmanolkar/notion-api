import { BaseController } from '@infrastructure/http/controllers/BaseController';
import { GetAllMembersByWorkspaceIdController } from '@infrastructure/http/controllers/workspaces/GetAllMembersByWorkspaceIdController';
import { makeGetAllMembersByWorkspaceId } from '@main/factories/use-cases/workspaces/get-all-members-by-workspace-id-factory';
import { makeGetWorkspaceById } from '@main/factories/use-cases/workspaces/get-workspace-by-id-factory';

export const makeGetAllMembersByWorkspaceIdController = (): BaseController => {
  const getWorkspaceByIdUseCase = makeGetWorkspaceById();
  const getAllMembersByWorkspaceIdUseCase = makeGetAllMembersByWorkspaceId();

  return new GetAllMembersByWorkspaceIdController(
    getWorkspaceByIdUseCase,
    getAllMembersByWorkspaceIdUseCase
  );
};
