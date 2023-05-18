import { WorkspaceNotFoundError } from '@application/errors/WorkspaceNotFoundError';
import { GetWorkspacesByUserIdRepository } from '@application/interfaces/repositories/users/getWorkspacesByUserIdRepository';
import { RemovePageIdFromFavoritesByWorkspaceIdRepository } from '@application/interfaces/repositories/users/removePageIdFromFavoritesByWorkspaceIdRepository';
import { RemovePageIdFromFavoritesByWorkspaceIdInterface } from '@application/interfaces/use-cases/users/RemovePageIdFromFavoritesByWorkspaceIdInterface';

export class RemovePageIdFromFavoritesByWorkspaceId
  implements RemovePageIdFromFavoritesByWorkspaceIdInterface
{
  constructor(
    private readonly getWorkspacesByUserIdRepository: GetWorkspacesByUserIdRepository,
    private readonly removePageIdFromFavoritesByWorkspaceIdRepository: RemovePageIdFromFavoritesByWorkspaceIdRepository
  ) {}

  async execute(
    params: RemovePageIdFromFavoritesByWorkspaceIdInterface.Request
  ): Promise<RemovePageIdFromFavoritesByWorkspaceIdInterface.Response> {
    const { userId, workspaceId, pageId } = params;

    const allWorkspaces =
      await this.getWorkspacesByUserIdRepository.getWorkspacesByUserId(userId);

    const verifiedWorkspace = allWorkspaces?.find(
      workspace => workspace.workspaceId === workspaceId
    );

    if (!verifiedWorkspace) {
      return new WorkspaceNotFoundError();
    }

    await this.removePageIdFromFavoritesByWorkspaceIdRepository.removePageIdFromFavoritesByWorkspaceId(
      {
        userId,
        workspaceId,
        pageId,
      }
    );
  }
}
