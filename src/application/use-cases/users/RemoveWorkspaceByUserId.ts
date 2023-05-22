import { RemoveWorkspaceByUserIdRepository } from '@application/interfaces/repositories/users/removeWorkspaceByUserIdRepository';
import { RemoveWorkspaceByUserIdInterface } from '@application/interfaces/use-cases/users/RemoveWorkspaceByUserIdInterface';

export class RemoveWorkspaceByUserId
  implements RemoveWorkspaceByUserIdInterface
{
  constructor(
    private readonly removeWorkspaceByUserIdRepository: RemoveWorkspaceByUserIdRepository
  ) {}

  async execute(
    params: RemoveWorkspaceByUserIdInterface.Request
  ): Promise<RemoveWorkspaceByUserIdInterface.Response> {
    const { userId, workspaceId } = params;

    await this.removeWorkspaceByUserIdRepository.removeWorkspaceByUserId({
      userId,
      workspaceId,
    });
  }
}
