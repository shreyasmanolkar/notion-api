import { BaseController } from '@infrastructure/http/controllers/BaseController';
import { UpdateWorkspaceController } from '@infrastructure/http/controllers/workspaces/UpdateWorkspaceController';
import { makeUpdateWorkspaceValidation } from '@main/factories/controllers/workspaces/update-workspace/validation-factory';
import { makeGetWorkspaceById } from '@main/factories/use-cases/workspaces/get-workspace-by-id-factory';
import { makeUpdateWorkspace } from '@main/factories/use-cases/workspaces/update-workspace-factory';

export const makeUpdateWorkspaceController = (): BaseController => {
  const validation = makeUpdateWorkspaceValidation();
  const getWorkspaceByIdUseCase = makeGetWorkspaceById();
  const updateWorkspaceUseCase = makeUpdateWorkspace();
  return new UpdateWorkspaceController(
    validation,
    getWorkspaceByIdUseCase,
    updateWorkspaceUseCase
  );
};
