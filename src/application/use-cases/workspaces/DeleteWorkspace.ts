import { DeleteWorkspaceRepository } from '@application/interfaces/repositories/workspaces/deleteWorkspaceRepository';
import { DeleteWorkspaceInterface } from '@application/interfaces/use-cases/workspaces/DeleteWorkspaceInterface';

export class DeleteWorkspace implements DeleteWorkspaceInterface {
  constructor(
    private readonly deleteWorkspaceRepository: DeleteWorkspaceRepository
  ) {}

  async execute(
    workspaceId: DeleteWorkspaceRepository.Request
  ): Promise<DeleteWorkspaceRepository.Response> {
    await this.deleteWorkspaceRepository.deleteWorkspace(workspaceId);
  }
}
