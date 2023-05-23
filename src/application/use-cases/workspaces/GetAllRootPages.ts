import { GetWorkspaceByIdRepository } from '@application/interfaces/repositories/workspaces/getWorkspaceByIdRepository';
import { GetAllRootPagesInterface } from '@application/interfaces/use-cases/workspaces/GetAllRootPagesInterface';
import { GetAllRootPagesRepository } from '@application/interfaces/repositories/workspaces/getAllRootPagesRepository';
import { WorkspaceNotFoundError } from '@application/errors/WorkspaceNotFoundError';

export class GetAllRootPages implements GetAllRootPagesInterface {
  constructor(
    private readonly getWorkspaceByIdRepository: GetWorkspaceByIdRepository,
    private readonly getAllRootPagesRepository: GetAllRootPagesRepository
  ) {}

  async execute(
    params: GetAllRootPagesInterface.Request
  ): Promise<GetAllRootPagesInterface.Response> {
    const { workspaceId } = params;

    const workspace = await this.getWorkspaceByIdRepository.getWorkspaceById(
      workspaceId
    );

    if (!workspace) {
      return new WorkspaceNotFoundError();
    }

    return this.getAllRootPagesRepository.getAllRootPages(workspaceId);
  }
}
