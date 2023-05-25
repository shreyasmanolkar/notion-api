import { WorkspaceNotFoundError } from '@application/errors/WorkspaceNotFoundError';
import { GetWorkspaceByIdRepository } from '@application/interfaces/repositories/workspaces/getWorkspaceByIdRepository';
import { RemoveMemberByWorkspaceIdRepository } from '@application/interfaces/repositories/workspaces/removeMemberByWorkspaceIdRepository';
import { RemoveMemberByWorkspaceIdInterface } from '@application/interfaces/use-cases/workspaces/RemoveMemberByWorkspaceIdInterface';

export class RemoveMemberByWorkspaceId
  implements RemoveMemberByWorkspaceIdInterface
{
  constructor(
    private readonly getWorkspaceByIdRepository: GetWorkspaceByIdRepository,
    private readonly removeMemberByWorkspaceIdRepository: RemoveMemberByWorkspaceIdRepository
  ) {}

  async execute(
    params: RemoveMemberByWorkspaceIdInterface.Request
  ): Promise<RemoveMemberByWorkspaceIdInterface.Response> {
    const { workspaceId, memberId } = params;

    const workspace = await this.getWorkspaceByIdRepository.getWorkspaceById(
      workspaceId
    );

    if (!workspace) {
      return new WorkspaceNotFoundError();
    }

    await this.removeMemberByWorkspaceIdRepository.removeMemberByWorkspaceId({
      workspaceId,
      memberId,
    });
  }
}
