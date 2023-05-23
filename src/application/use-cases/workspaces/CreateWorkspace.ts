import { CreateWorkspaceRepository } from '@application/interfaces/repositories/workspaces/createWorkspaceRepository';
import { CreateWorkspaceInterface } from '@application/interfaces/use-cases/workspaces/CreateWorkspaceInterface';

export class CreateWorkspace implements CreateWorkspaceInterface {
  constructor(
    private readonly createWorkspaceRepository: CreateWorkspaceRepository
  ) {}

  async execute(
    workspaceData: CreateWorkspaceInterface.Request
  ): Promise<CreateWorkspaceInterface.Response> {
    return this.createWorkspaceRepository.createWorkspace(workspaceData);
  }
}
