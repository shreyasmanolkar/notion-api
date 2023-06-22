import { BaseController } from '@infrastructure/http/controllers/BaseController';
import { UpdateWorkspaceController } from '@infrastructure/http/controllers/workspaces/UpdateWorkspaceController';
import { makeUpdateWorkspaceValidation } from '@main/factories/controllers/workspaces/update-workspace/validation-factory';
import { makeUpdateUserWorkspaceMetaDataByWorkspaceId } from '@main/factories/use-cases/users/update-user-workspace-meta-data-by-workspace-id-factory';
import { makeGetAllMembersByWorkspaceId } from '@main/factories/use-cases/workspaces/get-all-members-by-workspace-id-factory';
import { makeGetWorkspaceById } from '@main/factories/use-cases/workspaces/get-workspace-by-id-factory';
import { makeUpdateWorkspace } from '@main/factories/use-cases/workspaces/update-workspace-factory';

export const makeUpdateWorkspaceController = (): BaseController => {
  const validation = makeUpdateWorkspaceValidation();
  const getWorkspaceByIdUseCase = makeGetWorkspaceById();
  const updateWorkspaceUseCase = makeUpdateWorkspace();
  const getAllMembersByWorkspaceIdUseCase = makeGetAllMembersByWorkspaceId();
  const updateUserWorkspaceMetaDataByWorkspaceIdUseCase =
    makeUpdateUserWorkspaceMetaDataByWorkspaceId();

  return new UpdateWorkspaceController(
    validation,
    getWorkspaceByIdUseCase,
    updateWorkspaceUseCase,
    getAllMembersByWorkspaceIdUseCase,
    updateUserWorkspaceMetaDataByWorkspaceIdUseCase
  );
};
