import { WorkspaceNotFoundError } from '@application/errors/WorkspaceNotFoundError';
import { GetAllMembersByWorkspaceIdRepository } from '@application/interfaces/repositories/workspaces/getAllMembersByWorkspaceIdRepository';
import { GetWorkspaceByIdRepository } from '@application/interfaces/repositories/workspaces/getWorkspaceByIdRepository';
import { GetAllMembersByWorkspaceIdInterface } from '@application/interfaces/use-cases/workspaces/GetAllMembersByWorkspaceIdInterface';

export class GetAllMembersByWorkspaceId
  implements GetAllMembersByWorkspaceIdInterface
{
  constructor(
    private readonly getWorkspaceByIdRepository: GetWorkspaceByIdRepository,
    private readonly getAllMembersByWorkspaceIdRepository: GetAllMembersByWorkspaceIdRepository
  ) {}

  async execute(
    workspaceId: GetAllMembersByWorkspaceIdInterface.Request
  ): Promise<GetAllMembersByWorkspaceIdInterface.Response> {
    const workspace = await this.getWorkspaceByIdRepository.getWorkspaceById(
      workspaceId
    );

    if (!workspace) {
      return new WorkspaceNotFoundError();
    }

    return this.getAllMembersByWorkspaceIdRepository.getAllMembersByWorkspaceId(
      workspaceId
    );
  }
}
