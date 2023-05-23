import { WorkspaceNotFoundError } from '@application/errors/WorkspaceNotFoundError';
import { GetWorkspaceByIdRepository } from '@application/interfaces/repositories/workspaces/getWorkspaceByIdRepository';
import { GetWorkspaceByIdInterface } from '@application/interfaces/use-cases/workspaces/GetWorkspaceByIdInterface';

export class GetWorkspaceById implements GetWorkspaceByIdInterface {
  constructor(
    private readonly getWorkspaceByIdRepository: GetWorkspaceByIdRepository
  ) {}

  async execute(
    params: GetWorkspaceByIdInterface.Request
  ): Promise<GetWorkspaceByIdInterface.Response> {
    const { workspaceId } = params;

    const workspace = await this.getWorkspaceByIdRepository.getWorkspaceById(
      workspaceId
    );

    if (!workspace) {
      return new WorkspaceNotFoundError();
    }

    return workspace;
  }
}
