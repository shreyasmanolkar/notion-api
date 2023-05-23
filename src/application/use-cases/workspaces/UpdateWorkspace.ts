import { WorkspaceNotFoundError } from '@application/errors/WorkspaceNotFoundError';
import { GetWorkspaceByIdRepository } from '@application/interfaces/repositories/workspaces/getWorkspaceByIdRepository';
import { UpdateWorkspaceRepository } from '@application/interfaces/repositories/workspaces/updateWorkspaceRepository';
import { UpdateWorkspaceInterface } from '@application/interfaces/use-cases/workspaces/UpdateWorkspaceInterface';

export class UpdateWorkspace implements UpdateWorkspaceInterface {
  constructor(
    private readonly getWorkspaceByIdRepository: GetWorkspaceByIdRepository,
    private readonly updateWorkspaceRepository: UpdateWorkspaceRepository
  ) {}

  async execute(
    params: UpdateWorkspaceInterface.Request
  ): Promise<UpdateWorkspaceInterface.Response> {
    const { workspaceId, workspaceData } = params;
    const workspace = await this.getWorkspaceByIdRepository.getWorkspaceById(
      workspaceId
    );

    if (!workspace) {
      return new WorkspaceNotFoundError();
    }

    return this.updateWorkspaceRepository.updateWorkspace({
      workspaceId,
      workspaceData,
    });
  }
}
