import { BaseController } from '@infrastructure/http/controllers/BaseController';
import { CreateWorkspaceController } from '@infrastructure/http/controllers/workspaces/CreateWorkspaceController';
import { makeCreateWorkspace } from '@main/factories/use-cases/workspaces/create-workspace-factory';
import { makeCreateWorkspaceValidation } from '@main/factories/controllers/workspaces/create-workspace/validation-factory';

export const makeCreateWorkspaceController = (): BaseController => {
  const validation = makeCreateWorkspaceValidation();
  const createWorkspaceUseCase = makeCreateWorkspace();

  return new CreateWorkspaceController(validation, createWorkspaceUseCase);
};
